/**
 * ProgressMap Component
 * Shows regional progress with visual progress bars
 * Phase 5: Learning Enhancements
 */

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getUserProgress } from '../utils/localStorage';
import countries from '../data/countries.json';
import './ProgressMap.css';

/**
 * Region configuration with colors and emojis
 */
const REGION_CONFIG = {
  'World': { emoji: '🌎', color: 'var(--interactive-primary)' },
  'Africa': { emoji: '🌍', color: '#f59e0b' },
  'Asia': { emoji: '🌏', color: '#ef4444' },
  'Europe': { emoji: '🇪🇺', color: '#3b82f6' },
  'North America': { emoji: '🌎', color: '#22c55e' },
  'South America': { emoji: '🌎', color: '#a855f7' },
  'Oceania': { emoji: '🌊', color: '#06b6d4' }
};

/**
 * Calculate progress for each region
 */
function calculateRegionProgress(progress) {
  const regions = {};
  
  // Initialize regions
  Object.keys(REGION_CONFIG).forEach(region => {
    if (region !== 'World') {
      regions[region] = {
        total: 0,
        answered: 0,
        mastered: 0,
        accuracy: 0
      };
    }
  });

  // Count countries per region and progress
  countries.forEach(country => {
    const region = country.region;
    if (!regions[region]) return;
    
    regions[region].total++;
    
    const countryProgress = progress[country.id];
    if (countryProgress && countryProgress.timesShown > 0) {
      regions[region].answered++;
      
      // Consider mastered if bucket is 'mastered' or high accuracy
      if (countryProgress.bucket === 'mastered') {
        regions[region].mastered++;
      }
    }
  });

  // Calculate accuracy for each region
  Object.keys(regions).forEach(region => {
    const r = regions[region];
    r.progressPercent = r.total > 0 ? Math.round((r.answered / r.total) * 100) : 0;
    r.masteryPercent = r.total > 0 ? Math.round((r.mastered / r.total) * 100) : 0;
  });

  // Calculate world totals
  const worldTotal = countries.length;
  const worldAnswered = Object.values(progress).filter(p => p.timesShown > 0).length;
  const worldMastered = Object.values(progress).filter(p => p.bucket === 'mastered').length;

  return {
    regions,
    world: {
      total: worldTotal,
      answered: worldAnswered,
      mastered: worldMastered,
      progressPercent: Math.round((worldAnswered / worldTotal) * 100),
      masteryPercent: Math.round((worldMastered / worldTotal) * 100)
    }
  };
}

export default function ProgressMap({ onClose }) {
  const progress = useMemo(() => getUserProgress(), []);
  const progressData = useMemo(() => calculateRegionProgress(progress), [progress]);

  return (
    <div className="progress-map-overlay" onClick={onClose}>
      <div 
        className="progress-map-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="progress-map-title"
      >
        <div className="progress-map-header">
          <h2 id="progress-map-title" className="progress-map-title">
            📍 Your World Progress
          </h2>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close progress map"
          >
            ✕
          </button>
        </div>

        {/* World Overview */}
        <div className="world-overview">
          <div className="world-stat">
            <span className="world-emoji">{REGION_CONFIG.World.emoji}</span>
            <div className="world-numbers">
              <span className="world-fraction">
                {progressData.world.answered} / {progressData.world.total}
              </span>
              <span className="world-label">Countries Explored</span>
            </div>
          </div>
          <div className="world-progress-bar">
            <div 
              className="world-progress-fill"
              style={{ width: `${progressData.world.progressPercent}%` }}
            />
            <div 
              className="world-mastery-fill"
              style={{ width: `${progressData.world.masteryPercent}%` }}
            />
          </div>
          <div className="world-legend">
            <span className="legend-item explored">
              <span className="legend-dot" /> Explored ({progressData.world.progressPercent}%)
            </span>
            <span className="legend-item mastered">
              <span className="legend-dot" /> Mastered ({progressData.world.masteryPercent}%)
            </span>
          </div>
        </div>

        {/* Regional Progress */}
        <div className="regions-grid">
          {Object.entries(progressData.regions).map(([region, data]) => {
            const config = REGION_CONFIG[region];
            return (
              <div key={region} className="region-card">
                <div className="region-header">
                  <span className="region-emoji">{config.emoji}</span>
                  <span className="region-name">{region}</span>
                </div>
                <div className="region-stats">
                  <span className="region-count">
                    {data.answered}/{data.total}
                  </span>
                  <span className="region-percent">{data.progressPercent}%</span>
                </div>
                <div className="region-progress-bar">
                  <div 
                    className="region-progress-fill"
                    style={{ 
                      width: `${data.progressPercent}%`,
                      backgroundColor: config.color 
                    }}
                  />
                  <div 
                    className="region-mastery-fill"
                    style={{ 
                      width: `${data.masteryPercent}%`,
                      backgroundColor: 'var(--feedback-success)' 
                    }}
                  />
                </div>
                {data.mastered > 0 && (
                  <div className="region-mastery">
                    ⭐ {data.mastered} mastered
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="progress-map-footer">
          <p className="footer-tip">
            💡 Keep practicing to turn more countries to ⭐ Mastered status!
          </p>
        </div>
      </div>
    </div>
  );
}

ProgressMap.propTypes = {
  onClose: PropTypes.func.isRequired
};
