import type { Route } from './+types/home';
import { useState } from 'react';
import { useAuth } from '~/hooks/use-auth';
import { useSos } from '~/hooks/use-sos';
import { useContacts } from '~/hooks/use-contacts';
import { AuthScreen } from '~/components/auth-screen/auth-screen';
import { TopBar } from '~/components/top-bar/top-bar';
import { BottomNav } from '~/components/bottom-nav/bottom-nav';
import type { NavTab } from '~/components/bottom-nav/bottom-nav';
import { TabHome } from '~/components/tab-home/tab-home';
import { TabContacts } from '~/components/tab-contacts/tab-contacts';
import { TabLocation } from '~/components/tab-location/tab-location';
import { TabLogs } from '~/components/tab-logs/tab-logs';
import { TabProfile } from '~/components/tab-profile/tab-profile';
import styles from './home.module.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Emergency SOS — One-Tap Safety System' },
    { name: 'description', content: 'Emergency SOS App: one-tap emergency alerts with live location sharing and instant contact notifications.' },
    { name: 'theme-color', content: '#dc2626' },
  ];
}

export default function Home() {
  const { isAuthenticated, user, authError, authMode, setAuthMode, login, signup, logout } = useAuth();
  const { phase, countdown, location, alertsSent, elapsedSeconds, logs, triggerSos, cancelCountdown, cancelSos, resolveSos } =
    useSos();
  const { contacts, addContact, removeContact } = useContacts();
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  if (!isAuthenticated || !user) {
    return (
      <AuthScreen
        authMode={authMode}
        authError={authError}
        onLogin={login}
        onSignup={signup}
        onModeChange={setAuthMode}
      />
    );
  }

  const isEmergencyActive = phase === 'active' || phase === 'countdown';
  const isTracking = phase === 'active';

  return (
    <div className={styles.appShell}>
      <TopBar isEmergencyActive={isEmergencyActive} onLogout={logout} />

      <main className={styles.main}>
        {activeTab === 'home' && (
          <TabHome
            user={user}
            phase={phase}
            countdown={countdown}
            location={location}
            alertsSent={alertsSent}
            elapsedSeconds={elapsedSeconds}
            contactCount={contacts.length}
            totalLogs={logs.length}
            onTrigger={triggerSos}
            onCancelCountdown={cancelCountdown}
            onCancelSos={cancelSos}
            onResolveSos={resolveSos}
          />
        )}
        {activeTab === 'contacts' && (
          <TabContacts contacts={contacts} onAdd={addContact} onRemove={removeContact} />
        )}
        {activeTab === 'location' && (
          <TabLocation location={location} isTracking={isTracking} />
        )}
        {activeTab === 'logs' && <TabLogs logs={logs} />}
        {activeTab === 'profile' && <TabProfile user={user} onLogout={logout} />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} contactCount={contacts.length} />
    </div>
  );
}
