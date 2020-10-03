import { useEffect, useState } from 'react';
import styles from '../styles/location-tile.module.scss';
import {
  HiOutlineChevronRight,
  HiOutlineArrowDown,
  HiOutlineArrowUp,
} from 'react-icons/hi';

export default function LocationTile({ location }) {
  let baseUrl =
    'https://api.weatherapi.com/v1/forecast.json?key=069d9221621d4a4a807100404200310&q=';
  let fullUrl = baseUrl + location.replace(/ /g, '%20');
  const [data, setData] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const fetchWeatherData = () => fetch(fullUrl).then((res) => res.json());

  useEffect(() => {
    fetchWeatherData().then((data) => setData(data));
  }, []);

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
        <section className={styles.bottom}></section>
      </div>
    )
  );
}
