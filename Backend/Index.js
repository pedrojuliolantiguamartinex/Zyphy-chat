// modulos utilizados son como extensiones
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const crypto = require('crypto');
const http = require("http");
const { Server } = require("socket.io");


// Configuraciones de express para el servidor y los cors para el acceso de multiples diposivos
const app = express();
app.use(cors());
app.use(express.json());

//ruta de las imagenes donde las voy ingresando
const upload = multer({dest: 'uploads'})

//Configuraciones del Chat con socket.io y la constancia de la conexion de usuarios
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user has connected!')

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    socket.on('Chat message', (msg) => {
        // console.log('message:' + msg);
        io.emit('Chat message', msg)
    })
});

//Respuesta del Servidor
// app.get("/", (req, res) => {
//     res.json("hello123");
//   });


app.use(express.static(path.join(__dirname, 'build')));

app.get('/'), function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}


//En donde las imagenes se colocan dentro del servidor para ser llamadas posteriormente
  const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// conexion a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Zyphy_room",
}); 
db.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      return;
    }
    console.log("Conexión a la base de datos exitosa");
  });

// A traves de esta api se envian las imagenes para que se guarden en la carpeta statica del servidor upload
  app.post('/images/single', upload.single('ImagenPost'), (req, res) => {
    console.log(req.file);
    const newFilePath = saveImage(req.file);
    res.json({ filePath: newFilePath });
});

//La funcion encargada de guardar las imagenes
function saveImage(file) {
    const fileExtension = file.originalname.split('.').pop(); 
    const randomName = crypto.randomBytes(16).toString('hex'); 
    const newFileName = `${randomName}.${fileExtension}`;
    const newPath = `uploads/${newFileName}`;
    
    fs.renameSync(file.path, newPath);
    return newFileName;
}

//Api para mostrar los laptops
app.get('/api/likes/:id_post/:id_usuario', (req, res) => {
  const { id_post, id_usuario } = req.params;

  db.query('SELECT COUNT(*) as likeCount, (SELECT COUNT(*) FROM likes WHERE id_post = ? AND id_usuario = ?) as userLiked FROM likes WHERE id_post = ?', [id_post, id_usuario, id_post], (err, result) => {
    if (err) {
      console.error('Error al verificar like en la base de datos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    const likeCount = result[0].likeCount;
    const userLiked = result[0].userLiked > 0;
    return res.status(200).json({ likeCount, userLiked });
  });
});

//Agregar el like
app.post('/api/like', (req, res) => {
  const { id_post, id_usuario } = req.body;

  db.query('INSERT INTO likes (id_post, id_usuario) VALUES (?, ?)', [id_post, id_usuario], (err, result) => {
    if (err) {
      console.error('Error al insertar like en la base de datos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    return res.status(200).json({ message: 'Like creado exitosamente' });
  });
});


    //La api que se encarga de mostrar los post 'release' es el nombre con el que me refiero a los post
    app.get("/release", (req, res) => {
      const q = `
        SELECT r.*, u.username AS nombre_usuario, u.apellido, u.email, p.foto_perfil
        FROM \`release\` AS r 
        INNER JOIN usuarios AS u ON r.id_usuario = u.id_usuario 
        INNER JOIN perfil AS p ON u.id_perfil = p.id_perfil
        ORDER BY r.id_post DESC;
      `;
      db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        return res.json(data);
      });
    });
    
  //Api que agrega los Post
  app.post("/release", (req, res) => {
    console.log("Datos recibidos en /release:", req.body); 
  
    const q = "INSERT INTO `release`(Descripcion, Cover,id_usuario) VALUES (?, ?, ?)";
    const values = [
      req.body.Descripcion,
      req.body.Cover,
      req.body.id_usuario
    ];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error al insertar datos en la base de datos:", err); 
        return res.status(500).json({ error: "Internal Server Error" }); 
      }
  
      console.log("Datos insertados correctamente en la base de datos:", data); 
      return res.json(data); 
    });
  });

  // Api para contar los posts de un usuario específico
app.get('/api/user/:id/posts/count', (req, res) => {
  const userId = req.params.id;
  const q = 'SELECT COUNT(*) AS postCount FROM `release` WHERE id_usuario = ?';

  db.query(q, [userId], (err, data) => {
      if (err) {
          console.error("Error al contar los posts del usuario:", err);
          return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data[0]);
  });
});

  
  
//Api que muestra los comentarios en relacion al Post
  app.get('/api/comments', (req, res) => {
    db.query('SELECT c.*, u.username AS nombre_usuario FROM comments AS c INNER JOIN usuarios AS u ON c.id_usuario = u.id_usuario  ORDER BY c.id_comment DESC;' , (error, results) => {
      if (error) throw error;
      res.json(results);
    });
});


//Api para guardar o insertan los comentarios
  app.post("/api/comments", (req, res) => {
    console.log("Datos recibidos en /api/comments:", req.body); 
    const q = "INSERT INTO comments(comentario, id_post, id_usuario) VALUES (?, ?, ?)";
    const values = [
      req.body.comentario,
      req.body.id_post,
      req.body.id_usuario
    ];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error al insertar datos en la base de datos:", err); 
        return res.status(500).json({ error: "Internal Server Error" }); 
      }
  
      console.log("Datos insertados correctamente en la base de datos:", data); 
      return res.json(data); 
    });
});

//Api que muestra el perfil del usuario
app.get("/api/perfil/:idUsuario", (req, res) => {
  const idUsuario = req.params.idUsuario;
  const q = "SELECT * FROM perfil WHERE id_usuario = ? ORDER BY id_perfil DESC";
  db.query(q, idUsuario, (err, data) => {
    if (err) {
      console.error("Error al obtener el perfil del usuario:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

//Api que maneja lo de agregar el perfil
app.post("/api/perfil", (req, res) => {
  console.log("Datos recibidos en /api/perfil:", req.body); // Verificar los datos recibidos en el servidor

  const q = "INSERT INTO perfil(bio,ocupacion,ubicacion,hobbies,foto_perfil,foto_portada) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.bio,
    req.body.ocupacion,
    req.body.ubicacion,
    req.body.hobbies,
    req.body.foto_perfil,
    req.body.foto_portada,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error al insertar datos en la base de datos:", err);
      return res.status(500).json({ error: "Internal Server Error" }); 
    }
    console.log("Datos insertados correctamente en la base de datos:", data); 
    res.status(201).json({ id: data.insertId });
  });
});

//Api que modifica campos del perfil
app.put("/api/perfil/:id", (req, res) => {
  const perfilId = req.params.id;
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ error: "id_usuario es requerido" });
  }

  const q = "UPDATE perfil SET id_usuario = ? WHERE id_perfil = ?";
  const values = [id_usuario, perfilId];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar id_usuario en la base de datos:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    res.status(200).json({ message: "id_usuario actualizado correctamente" });
  });
});


//Api del buscador que muestra los usuarios y esta relacionada con la tabla perfil para mostrar la foto de perfil
app.get("/api/usuarios", (req, res) => {
  const q = "SELECT usuarios.*, perfil.* FROM usuarios JOIN perfil ON usuarios.id_perfil = perfil.id_perfil";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err); 
    }
    return res.json(data);
  });
});


// Api para registrar los usuarios
app.post("/api/usuarios", (req, res) => {
  console.log("Datos recibidos en /api/perfil:", req.body); 
  const q = "INSERT INTO usuarios(nombre,apellido,email,password,username,id_perfil) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.email,
    req.body.password,
    req.body.username,
    req.body.id_perfil,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error al insertar datos en la base de datos:", err); 
      return res.status(500).json({ error: "Internal Server Error" }); 
    }
    console.log("Datos insertados en la base de datos:", data); 
    return res.json(data); 
  });
});

//Api para borrar usuarios
app.delete("/api/usuarios/:id", (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM usuarios WHERE id_usuario = ?"; 

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Error al borrar el usuario de la base de datos:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.affectedRows === 0) {
      // Si no se encontró el usuario con el ID proporcionado
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    console.log("Usuario borrado de la base de datos:", data);
    return res.json({ message: "Usuario borrado exitosamente" });
  });
});



//modifica un campo del usuario
app.put("/api/usuario/:id", (req, res) => {
  const usuarioId = req.params.id;
  const perfilId = req.body.id_perfil;

  const q = "UPDATE usuarios SET id_perfil = ? WHERE id_usuario = ?";
  const values = [perfilId, usuarioId];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error al actualizar id_perfil en la base de datos:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("id_perfil actualizado correctamente en la base de datos:", data);
    res.status(200).json({ message: "Usuario actualizado correctamente" });
  });
});

//Api para el logueo
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      console.error('Error al buscar usuario en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else if (result.length === 0) {
      res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    } else {
      res.status(200).json({ message: 'Inicio de sesión exitoso', user: result[0] });
    }
  });
});

//Api para extraer la imagen del usuario
app.get("/api/imagenPost/:id", (req, res) => {
  const userId = req.params.id;
  const q =`SELECT usuarios.id_usuario AS id, usuarios.*, perfil.foto_perfil AS perfil_imagen
            FROM usuarios JOIN perfil ON usuarios.id_perfil = perfil.id_perfil
            WHERE usuarios.id_usuario = ?`;
  
  db.query(q, [userId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err); 
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    return res.json(data);
  });
});


//ESto coloca el server en un puerto en este caso el designado por mi el 8800 y permite que la aplicacion se suba en dicho puerto
const port = process.env.PORT || 8800;
server.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
  