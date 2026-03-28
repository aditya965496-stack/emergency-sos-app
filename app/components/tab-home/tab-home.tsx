import { Shield, Users, Clock, Zap } from 'lucide-react';
import type { SosPhase, Location } from '~/hooks/use-sos';
import type { UserProfile } from '~/data/mock-data';
import { SosButton } from '~/components/sos-button/sos-button';
import { ActiveAlert } from '~/components/active-alert/active-alert';
import styles from './tab-home.module.css';

interface TabHomeProps {
  user: UserProfile;
  phase: SosPhase;
  countdown: number;
  location: Location | null;
  alertsSent: number;
  elapsedSeconds: number;
  contactCount: number;
  totalLogs: number;
  onTrigger: () => void;
  onCancelCountdown: () => void;
  onCancelSos: () => void;
  onResolveSos: () => void;
}

export function TabHome({
  user,
  phase,
  countdown,
  location,
  alertsSent,
  elapsedSeconds,
  contactCount,
  totalLogs,
  onTrigger,
  onCancelCountdown,
  onCancelSos,
  onResolveSos,
}: TabHomeProps) {
  return (
    <div className={styles.page}>
      <div className={styles.greeting}>
        <div>
          <div className={styles.greetText}>Hello, {user.name.split(' ')[0]} 👋</div>
          <div className={styles.greetSub}>Stay safe. Help is one tap away.</div>
        </div>
        <div className={styles.avatarCircle}>{user.avatar}</div>
      </div>

      {phase === 'countdown' ? (
        <div className={styles.countdownPanel}>
          <div className={styles.countdownTitle}>⚠️ Sending SOS Alert in...</div>
          <div className={styles.countdownTimer}>{countdown}</div>
          <button className={styles.cancelBtn} onClick={onCancelCountdown} type="button">
            Cancel
          </button>
        </div>
      ) : (
        <SosButton phase={phase} countdown={countdown} onTrigger={onTrigger} />
      )}

      {phase === 'active' && (
        <ActiveAlert
          location={location}
          alertsSent={alertsSent}
          elapsedSeconds={elapsedSeconds}
          contactCount={contactCount}
          onCancel={onCancelSos}
          onResolve={onResolveSos}
        />
      )}

      {phase === 'idle' && (
        <>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Shield size={18} /></div>
              <div className={styles.infoLabel}>Status</div>
              <div className={styles.infoValue}>Safe</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Users size={18} /></div>
              <div className={styles.infoLabel}>Contacts</div>
              <div className={styles.infoValue}>{contactCount}</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Clock size={18} /></div>
              <div className={styles.infoLabel}>SOS Logs</div>
              <div className={styles.infoValue}>{totalLogs}</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Zap size={18} /></div>
              <div className={styles.infoLabel}>Response</div>
              <div className={styles.infoValue}>5s delay</div>
            </div>
          </div>

          <div className={styles.tipCard}>
            <div className={styles.tipTitle}>⚡ Quick Tips</div>
            <div className={styles.tipList}>
              {[
                'Tap SOS for a 5-second countdown before sending alerts',
                'Add emergency contacts in the Contacts tab',
                'Your live location is shared when SOS is active',
                'Tap "I\'m Safe" to resolve and notify all contacts',
              ].map((tip, i) => (
                <div key={i} className={styles.tipItem}>
                  <span className={styles.tipBullet} />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
