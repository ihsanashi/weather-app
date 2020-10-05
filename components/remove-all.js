import { useEffect } from 'react';
import styles from '../styles/remove-all.module.scss';
import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveAll({ locationList, setLocationList }) {
  const handleRemoveAll = () => {
    while (locationList.length > 0) {
      locationList.pop();
    }
    const data = localStorage.removeItem('loc-data');
    if (data) {
      setLocationList(JSON.parse(data));
    }
    setLocationList(locationList);
  };

  useEffect(() => {}, [locationList]);

  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={handleRemoveAll}>
        <HiOutlineTrash className={styles.icon} />
        <p className={styles.text}>Remove all</p>
      </button>
    </section>
  );
}
