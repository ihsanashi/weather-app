import Head from 'next/head';
import Greeting from '../components/greeting';
import styles from '../styles/Home.module.scss';
import { useState, useEffect } from 'react';
import AddLocation from '../components/add-location';
import LocationTile from '../components/location-tile';
import RemoveAll from '../components/remove-all';

export default function Home() {
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('loc-data');
    if (data) {
      setLocationList(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('loc-data', JSON.stringify(locationList));
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Check The Weather</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='A Progressive Web App (PWA) for checking weathers of different locations'
        />
        <meta name='robots' content='index, follow' />
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          key='viewport'
        />
      </Head>
      <main className={styles.main}>
        <img
          className={styles.appicon}
          src='/icon.svg'
          alt='Check The Weather appicon'
        />
        <Greeting
          locationList={locationList}
          setLocationList={setLocationList}
        />
        <AddLocation
          locationList={locationList}
          setLocationList={setLocationList}
        />
        {locationList.map((item, index) => (
          <LocationTile
            key={index}
            location={item}
            locationList={locationList}
            setLocationList={setLocationList}
          />
        ))}
      </main>
    </div>
  );
}
