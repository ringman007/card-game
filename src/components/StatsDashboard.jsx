/**
 * StatsDashboard Component
 * Shows comprehensive statistics and performance tracking
 * Phase 3: Session history, trends, mastery by region, export
 */

import PropTypes from 'prop-types';
import { getStats, getUserProgress } from '../utils/localStorage';
import countriesData from '../data/countries.json';
import './StatsDashboard.css';

/**
 * Calculate mastery stats by region
 */
function getMasteryByRegion(progress) {
  const regions = {};
  
  countriesData.forEach(country => {
    const region = country.region;
    if (!regions[region]) {
      regions[region] = { total: 0, new: 0, learning: 0, review: 0, mastered: 0 };
    }
    
    regions[region].total++;
    
    const questionProgress = progress[country.id];
    if (!questionProgress || questionProgress.timesShown === 0) {
      regions[region].new++;
    } else {
      const interval = questionProgress.interval || 1;
      if (interval < 7) {
        regions[region].learning++;
      } else if (interval < 21) {
        regions[region].review++;
      } else {
        regions[region].mastered++;
      }
    }
  });
  
  return regions;
}

/**
 * Calculate performance trend (7-day, 30-day, all-time)
 */
function calculateTrends(sessionHistory) {
  const now = new Date();
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  
  const last7Days = sessionHistory.filter(s => new Date(s.date) >= sevenDaysAgo);
  const last30Days = sessionHistory.filter(s => new Date(s.date) >= thirtyDaysAgo);
  
  const calculateAccuracy = (sessions) => {
    if (sessions.length === 0) return null;
    const totalCorrect = sessions.reduce((sum, s) => sum + s.correctCount, 0);
    const totalAnswered = sessions.reduce((sum, s) => sum + s.correctCount + s.incorrectCount, 0);
    return totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  };
  
  return {
    week: calculateAccuracy(last7Days),
    month: calculateAccuracy(last30Days),
    allTime: calculateAccuracy(sessionHistory)
  };
}

/**
 * Export progress data as JSON
 */
function exportProgress() {
  const progress = getUserProgress();
  const stats = getStats();
  const exportData = {
    exportDate: new Date().toISOString(),
    progress,
    stats,
    countriesCount: countriesData.length
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `capital-progress-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function StatsDashboard({ onClose }) {
  const stats = getStats();
  const progress = getUserProgress();
  const masteryByRegion = getMasteryByRegion(progress);
  const trends = calculateTrends(stats.sessionHistory || []);
  
  const answeredCount = Object.keys(progress).filter(id => progress[id].timesShown > 0).length;
  const totalCountries = countriesData.length;

  return (
    <div className="stats-dashboard-overlay" onClick={onClose}>
      <div className="stats-dashboard" onClick={e => e.stopPropagation()}>
        <div className="stats-header">
          <h2 className="stats-title">📊 Your Progress</h2>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close statistics"
          >
            ✕
          </button>
        </div>

        {/* Overview Stats */}
        <div className="stats-section">
          <h3 className="section-title">Overview</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-value">{stats.totalSessions || 0}</span>
              <span className="overview-label">Sessions</span>
            </div>
            <div className="overview-item">
              <span className="overview-value">{answeredCount}/{totalCountries}</span>
              <span className="overview-label">Countries Seen</span>
            </div>
            <div className="overview-item">
              <span className="overview-value">🔥 {stats.bestStreak || 0}</span>
              <span className="overview-label">Best Streak</span>
            </div>
            <div className="overview-item">
              <span className="overview-value">
                {stats.totalCorrect + stats.totalIncorrect > 0 
                  ? `${Math.round((stats.totalCorrect / (stats.totalCorrect + stats.totalIncorrect)) * 100)}%`
                  : '-'
                }
              </span>
              <span className="overview-label">All-Time Accuracy</span>
            </div>
          </div>
        </div>

        {/* Accuracy Trends */}
        <div className="stats-section">
          <h3 className="section-title">Accuracy Trends</h3>
          <div className="trends-grid">
            <div className="trend-item">
              <span className="trend-period">7 Days</span>
              <span className="trend-value">
                {trends.week !== null ? `${trends.week}%` : '-'}
              </span>
            </div>
            <div className="trend-item">
              <span className="trend-period">30 Days</span>
              <span className="trend-value">
                {trends.month !== null ? `${trends.month}%` : '-'}
              </span>
            </div>
            <div className="trend-item">
              <span className="trend-period">All Time</span>
              <span className="trend-value">
                {trends.allTime !== null ? `${trends.allTime}%` : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Mastery by Region */}
        <div className="stats-section">
          <h3 className="section-title">Mastery by Region</h3>
          <div className="regions-list">
            {Object.entries(masteryByRegion).sort((a, b) => a[0].localeCompare(b[0])).map(([region, data]) => {
              const masteryPercent = Math.round(((data.mastered + data.review) / data.total) * 100);
              return (
                <div key={region} className="region-row">
                  <div className="region-info">
                    <span className="region-name">{region}</span>
                    <span className="region-counts">
                      <span className="count mastered">{data.mastered} ⭐</span>
                      <span className="count review">{data.review} 🔄</span>
                      <span className="count learning">{data.learning} 📚</span>
                      <span className="count new">{data.new} 🆕</span>
                    </span>
                  </div>
                  <div className="region-progress">
                    <div 
                      className="progress-bar-fill"
                      style={{ width: `${masteryPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Sessions */}
        {stats.sessionHistory && stats.sessionHistory.length > 0 && (
          <div className="stats-section">
            <h3 className="section-title">Recent Sessions</h3>
            <div className="sessions-list">
              {stats.sessionHistory.slice(0, 5).map((session, index) => (
                <div key={index} className="session-row">
                  <span className="session-date">
                    {new Date(session.date).toLocaleDateString()}
                  </span>
                  <span className="session-score">
                    {session.correctCount}/{session.correctCount + session.incorrectCount}
                  </span>
                  <span className="session-accuracy">
                    {Math.round(session.accuracy * 100)}%
                  </span>
                  {session.bestStreak > 0 && (
                    <span className="session-streak">🔥 {session.bestStreak}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="stats-actions">
          <button 
            className="export-button"
            onClick={exportProgress}
            aria-label="Export progress data as JSON"
          >
            📥 Export Progress
          </button>
        </div>
      </div>
    </div>
  );
}

StatsDashboard.propTypes = {
  onClose: PropTypes.func.isRequired
};
