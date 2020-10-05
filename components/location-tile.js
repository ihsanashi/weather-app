import { useEffect, useState } from 'react';
import styles from '../styles/location-tile.module.scss';
import {
  HiOutlineChevronRight,
  HiOutlineArrowDown,
  HiOutlineArrowUp,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Line } from 'react-chartjs-2';

export default function LocationTile({
  location,
  locationList,
  setLocationList,
}) {
  let baseUrl = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=`;
  let fullUrl = baseUrl + location.replace(/ /g, '%20');

  const [data, setData] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  let [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    async function fetchWeatherData() {
      const fullResponse = await fetch(fullUrl);
      const data = await fullResponse.json();
      setData(data);
      setLabel(data.location.name);
      data.forecast.forecastday[0].hour.map((hour) => {
        temperatures.push(hour.temp_c);
        setTemperatures(temperatures);
      });
    }
    fetchWeatherData();
  }, [locationList]);

  const weatherChartData = {
    labels: [
      '12AM',
      '1Am',
      '2AM',
      '3AM',
      '4AM',
      '5AM',
      '6AM',
      '7AM',
      '8AM',
      '9AM',
      '10AM',
      '11AM',
      '12PM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
      '6PM',
      '7PM',
      '8PM',
      '9PM',
      '10PM',
      '11PM',
    ],
    datasets: [
      {
        label: `Forecast for ${label}`,
        fill: true,
        lineTension: 0.1,
        backgroundColor: '#EFE3FD',
        borderColor: '#9D61EB',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#1A6BE5',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#D8315B',
        pointHoverBorderColor: '#78CAD2',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: temperatures,
      },
    ],
  };

  const handleDelete = () => {
    let locationToDelete = data.location.name;
    locationToDelete = locationToDelete.toLowerCase();
    locationList = locationList.filter((item) => item !== locationToDelete);
    setLocationList(locationList);
  };

  return (
    data && (
      <div
        className={`${styles.container} ${
          isOpen ? styles.blue__container : ''
        }`}
      >
        <section className={styles.top}>
          <div className={styles.grow}>
            <HiOutlineChevronRight
              id='chevronRight'
              className={`${styles.chevron__icon} ${
                isOpen ? styles.rotate__chevron : ''
              }`}
              onClick={() => setOpen(!isOpen)}
            />
            <div className={styles.left__column}>
              <div className={styles.info}>
                <div className={styles.data}>
                  <h2 className={styles.temperature}>{data.current.temp_c}</h2>
                  <h6 className={styles.symbol}>°C</h6>
                </div>
              </div>
              <h5 className={styles.location}>{location}</h5>
            </div>
          </div>
          <div>
            <img
              src={data.current.condition.icon}
              alt={`Icon for current weather of ${data.location.name}`}
            />
          </div>
        </section>
        <hr
          className={`${styles.horizontal__divider} ${
            !isOpen ? styles.collapsed : ''
          }`}
        />
        <section
          className={`${styles.middle} ${!isOpen ? styles.collapsed : ''}`}
        >
          <div className={styles.min__max__container}>
            <div className={styles.mintemp}>
              <HiOutlineArrowDown className={styles.mintemp__icon} />
              <p className={styles.mintemp__text}>
                Min: {data.forecast.forecastday[0].day.mintemp_c} °C
              </p>
            </div>
            <hr className={styles.vertical__middle__line} />
            <div className={styles.maxtemp}>
              <HiOutlineArrowUp className={styles.maxtemp__icon} />
              <p className={styles.maxtemp__text}>
                Max: {data.forecast.forecastday[0].day.maxtemp_c} °C
              </p>
            </div>
          </div>
        </section>
        <hr
          className={`${styles.horizontal__divider} ${
            !isOpen ? styles.collapsed : ''
          }`}
        />
        <section
          className={`${styles.bottom} ${!isOpen ? styles.collapsed : ''}`}
        >
          <Line
            data={weatherChartData}
            legend={{ bottom: 'Hours', left: '°C' }}
          />
        </section>
        <section
          className={`${styles.delete__section} ${
            !isOpen ? styles.collapsed : ''
          }`}
        >
          <button className={styles.delete__btn} onClick={handleDelete}>
            <HiOutlineTrash />
            Remove
          </button>
        </section>
      </div>
    )
  );
}
