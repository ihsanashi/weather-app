import Head from 'next/head';
import Greeting from '../components/greeting';
import styles from '../styles/Home.module.scss';
import { useState } from 'react';
import AddLocation from '../components/add-location';
import LocationTile from '../components/location-tile';

export default function Home() {
  const [locationList, setLocationList] = useState([]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Greeting
          locationList={locationList}
          setLocationList={setLocationList}
        />
        <AddLocation
          locationList={locationList}
          setLocationList={setLocationList}
        />
        {locationList.map((item) => (
          <LocationTile key={item} location={item} />
        ))}
      </main>
    </div>
  );
}