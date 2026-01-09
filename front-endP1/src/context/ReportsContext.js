import React, { createContext, useContext, useState, useCallback } from 'react';
import { reportService } from '../services/report.service';

const ReportsContext = createContext();

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    inProgress: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchReports = useCallback(async (isMyReports) => {
    setLoading(true);
    try {
      let data;
      if (isMyReports) {
        data = await reportService.getMyReports();
      } else {
        data = await reportService.getAllReports();
      }

      const reportsArray = Array.isArray(data) ? data : (data?.reports || []);
      setReports(reportsArray);

      // Calculate stats
      const newStats = {
        total: reportsArray.length,
        resolved: reportsArray.filter(r => r.status === 'resolu').length,
        inProgress: reportsArray.filter(r => r.status === 'en_cours').length,
        pending: reportsArray.filter(r => r.status === 'en_attente' || r.status === 'recu').length
      };
      setStats(newStats);

      return reportsArray;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const addReport = useCallback((newReport) => {
    setReports(prev => [newReport, ...prev]);
    setStats(prev => ({
      total: prev.total + 1,
      resolved: newReport.status === 'resolu' ? prev.resolved + 1 : prev.resolved,
      inProgress: newReport.status === 'en_cours' ? prev.inProgress + 1 : prev.inProgress,
      pending: (newReport.status === 'en_attente' || newReport.status === 'recu') ? prev.pending + 1 : prev.pending
    }));
  }, []);

  const updateReport = useCallback((updatedReport) => {
    setReports(prev => prev.map(r => r._id === updatedReport._id ? updatedReport : r));
    // Recalculate stats if status changed
    setStats(prev => {
      const oldReport = reports.find(r => r._id === updatedReport._id);
      if (!oldReport || oldReport.status === updatedReport.status) return prev;

      let newStats = { ...prev };

      // Remove from old status
      if (oldReport.status === 'resolu') newStats.resolved--;
      else if (oldReport.status === 'en_cours') newStats.inProgress--;
      else if (oldReport.status === 'en_attente' || oldReport.status === 'recu') newStats.pending--;

      // Add to new status
      if (updatedReport.status === 'resolu') newStats.resolved++;
      else if (updatedReport.status === 'en_cours') newStats.inProgress++;
      else if (updatedReport.status === 'en_attente' || updatedReport.status === 'recu') newStats.pending++;

      return newStats;
    });
  }, [reports]);

  const value = {
    reports,
    stats,
    loading,
    fetchReports,
    addReport,
    updateReport
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};
