'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Subject {
  code: string;
  description: string;
  finalGrade: string | number;
  units: number;
  honorPoints?: number;
}

interface ResultData {
  cgwa: number | null;
  subjects: Subject[];
}

interface ResultContextType extends ResultData {
  setResult: (data: ResultData) => void;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [cgwa, setCgwa] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const setResult = (data: ResultData) => {
    setCgwa(data.cgwa);
    setSubjects(data.subjects);
  };

  return (
    <ResultContext.Provider value={{ cgwa, subjects, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
}; 