"use client";

import { useEffect } from "react";
import { useArenaEvents, useLocalStorage } from "@/hooks";
import Image from "next/image";
import styles from "./_ArenaEvents.module.css";

export default function ArenaEvents() {
  const [selectedMonth, setSelectedMonth] = useLocalStorage(
    "selected-month",
    new Date().getMonth() + 1
  );
  const { events, loading, error, refetch } = useArenaEvents(selectedMonth);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    refetch();
  }, [selectedMonth, refetch]);

  if (loading) return <p>Loading Arena Racing events...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Arena Racing Events</h2>
        <select
          value={selectedMonth}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          className={styles.monthSelect}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(2025, month - 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
      </div>
      {!events.length ? (
        <div>
          <p>No events found for this month.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event.id} className={styles.card}>
              <Image
                src={event.images.mobile}
                alt={event.title}
                className={styles.image}
                width={100}
                height={100}
              />
              <div className={styles.content}>
                <h3>{event.title}</h3>
                <p className={styles.location}>{event.location}</p>
                <p className={styles.date}>
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <div className={styles.details}>
                  <p>
                    <strong>Gates Open:</strong> {event.gates_open}
                  </p>
                  <p>
                    <strong>First Race:</strong> {event.first_race}
                  </p>
                  <p>
                    <strong>Last Race:</strong> {event.last_race}
                  </p>
                  <p>
                    <strong>Races:</strong> {event.no_of_races}
                  </p>
                  <p>
                    <strong>Type:</strong> {event.race_type}
                  </p>
                </div>
                <p className={styles.description}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
