"use client";

import { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import type { IArenaEventResponse } from "@/types/arena.types";
import styles from "./ArenaEvents.module.css";

function ArenaEventCard({ event }: { event: IArenaEventResponse }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = event.description && event.description.length > 150;

  return (
    <div className={styles.card}>
      <Image
        src={event.images.mobile}
        alt={event.title}
        className={styles.image}
        width={400}
        height={200}
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

        {event.description && (
          <div>
            <p
              className={cn(styles.description, {
                [styles.descriptionExpanded]: isExpanded,
                [styles.descriptionTruncated]: !isExpanded,
              })}
            >
              {event.description}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(styles.readMoreBtn, {
                  [styles.expanded]: isExpanded,
                })}
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArenaEventCard;
