import styles from '../styles/add-location.module.scss';
import { useState } from 'react';

export default function AddLocation({ locationList, setLocationList }) {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleAddLocation() {
    if (locationList.includes(input.toLowerCase())) {
      setError(true);
      setErrorMsg(`${input.toLowerCase()} is already listed below`);
      setInput('');
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      setError(false);
      setLocationList((prevList) => [...prevList, input.toLowerCase().trim()]);
      setInput('');
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.flex__container}>
        <input
          value={input}
          type='index'
          name='location-input'
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder='Add new location'
        />
        <button
          className={styles.add__button}
          type='button'
          hidden={!input}
          onClick={handleAddLocation}
        >
          Add
        </button>
      </div>
      {error ? <p className={styles.error__msg}>{errorMsg}</p> : ''}
    </section>
  );
}
