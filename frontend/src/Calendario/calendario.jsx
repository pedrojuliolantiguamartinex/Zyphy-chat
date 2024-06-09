import React from 'react';
import './calendario.css';

class Calendario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      currentTime: this.getCurrentTime()
    };
  }

  componentDidMount() {
    // Actualizar la hora cada minuto
    this.intervalID = setInterval(() => {
      this.setState({
        currentTime: this.getCurrentTime()
      });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  render() {
    const { currentDate, currentTime } = this.state;
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const blanks = Array(firstDayOfMonth).fill(null);

    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return (
      <main>
        <div className="container">
          <div className="right">
            <div className="calendar-container">
              <div className="header">
                <h2>{`${months[currentMonth]} ${currentYear}`}</h2>
                <p>{currentTime}</p>
              </div>
              <div className="days">
                {[...Array(7).keys()].map(index => (
                  <div key={index}>{['D', 'L', 'M', 'M', 'J', 'V', 'S'][index]}</div>
                ))}
              </div>
              <div className="dates">
                {blanks.map((_, index) => (
                  <div key={index}></div>
                ))}
                {daysArray.map(day => (
                  <div key={day} className={day === today ? 'today' : ''}>{day}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Calendario;
