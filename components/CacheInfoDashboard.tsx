import { RequestLog } from "@/hooks";
import styles from "./ArenaEvents.module.css";

interface CacheInfoDashboardProps {
  selectedMonth: number;
  requestLog: Array<Omit<RequestLog, "duration">>;
}

const CacheInfoDashboard = ({
  selectedMonth,
  requestLog,
}: CacheInfoDashboardProps) => {
  return (
    <div className={styles.cacheInfo}>
      <h4>Cache Verification (25 min cache)</h4>
      <p>
        Selected Month: <strong>{selectedMonth}</strong>
      </p>
      <p>
        Total Requests: <strong>{requestLog.length}</strong>
      </p>

      <details>
        <summary className={styles.detailsToggle}>
          Request Log (click to expand)
        </summary>
        <div className={styles.requestLog}>
          {requestLog.length === 0 ? (
            <p className={styles.noRequest}>
              No requests yet. Change months to see cache behavior.
            </p>
          ) : (
            requestLog.map((log, i) => (
              <div key={i} className={styles.logEntry}>
                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                <span>Month {log.month}</span>
                <span className={log.fromCache ? styles.cached : styles.fresh}>
                  {log.fromCache ? "⚡ Cached" : "🔄 Fresh"}
                </span>
              </div>
            ))
          )}
        </div>
      </details>

      <small className={styles.smallText}>
        💡 Tip: Switch back to a previous month within 25 minutes to see cached
        response
      </small>
    </div>
  );
};

export default CacheInfoDashboard;
