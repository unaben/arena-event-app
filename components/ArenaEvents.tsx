"use client";

import { useArenaEvents, useLocalStorage } from "@/hooks";
import ArenaEventCard from "./ArenaEventCard";
import CacheInfoDashboard from "./CacheInfoDashboard";
import styles from "./ArenaEvents.module.css";

export default function ArenaEvents() {
  const [selectedMonth, setSelectedMonth] = useLocalStorage(
    "selected-month",
    new Date().getMonth() + 1
  );

  const { events, loading, error, requestLog } = useArenaEvents(selectedMonth);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Arena Racing Events</h2>

        <CacheInfoDashboard
          selectedMonth={selectedMonth}
          requestLog={requestLog}
        />

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
      {!loading && !events.length && error && (
        <p className={styles.error}>Error: {error}</p>
      )}
      {!events.length && !error && loading && (
        <p>Loading Arena Racing events...</p>
      )}
      {!error && !loading && !events.length ? (
        <div>
          <p>No events found for this month.</p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {events.map((event) => (
            <li key={event.id}>
              <ArenaEventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
