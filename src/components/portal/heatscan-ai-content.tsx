"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useLocale } from "@/context/locale-context";

type FlowState = "upload" | "analyzing" | "results";

interface HeatScanResult {
  id: string;
  manufacturer: string;
  model: string;
  heatingType: string;
  fuel: string;
  installedYear: number;
  estimatedAge: number;
  remainingLifespan: string;
  energyEfficiencyRating: string;
  maintenanceRisk: string;
  confidenceScore: number;
  healthScore: number;
  healthBreakdown: {
    efficiency: number;
    reliability: number;
    maintenance: number;
    safety: number;
    environmentalImpact: number;
    districtHeatingCompatibility: number;
  };
  insights: string[];
  commonIssues: {
    issue: string;
    likelihood: string;
    costRange: string;
    severity: string;
  }[];
  community: {
    similarHomes: number;
    averageBoilerAge: number;
    switchedToDH: number;
    averageYearlySavings: number;
    averageCO2Reduction: number;
  };
  costs: {
    currentAnnual: number;
    districtHeatingAnnual: number;
    potentialSavings: number;
    maintenanceSavings: number;
    tenYearSavings: number;
  };
  sustainability: {
    currentCO2: number;
    districtHeatingCO2: number;
    estimatedReduction: number;
    treesEquivalent: number;
    carsRemoved: number;
    co2SavedTonnes: number;
  };
  recommendation: string;
  imageUrl: string;
  name: string;
}

const demoSystems: { id: string; name: string; subtitle: string; imageUrl: string; result: HeatScanResult }[] = [
  {
    id: "demo-1",
    name: "Viessmann Vitodens 200",
    subtitle: "Gas Boiler — 2012",
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    result: {
      id: "demo-1",
      imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      name: "Viessmann Vitodens 200",
      manufacturer: "Viessmann",
      model: "Vitodens 200-W",
      heatingType: "Gas Boiler",
      fuel: "Natural Gas",
      installedYear: 2012,
      estimatedAge: 13,
      remainingLifespan: "5–7 Years",
      energyEfficiencyRating: "C",
      maintenanceRisk: "Moderate",
      confidenceScore: 96,
      healthScore: 74,
      healthBreakdown: {
        efficiency: 68,
        reliability: 81,
        maintenance: 64,
        safety: 88,
        environmentalImpact: 42,
        districtHeatingCompatibility: 95,
      },
      insights: [
        "Your boiler is approximately 13 years old. Most boilers of this generation begin showing increased maintenance requirements after 15 years.",
        "The detected model typically consumes more energy than modern district heating systems. Annual efficiency losses of 1–2% are common at this age.",
        "Replacement parts remain available but may become more expensive over time as this model generation phases out.",
        "Your heating system appears functional today, but planning a transition within the next few years could reduce future maintenance costs.",
        "District heating in your area offers a 41% average CO₂ reduction compared to gas boilers of this vintage.",
      ],
      commonIssues: [
        { issue: "Heat exchanger wear", likelihood: "High", costRange: "€800–€1,500", severity: "Moderate" },
        { issue: "Pump degradation", likelihood: "Medium", costRange: "€300–€600", severity: "Low" },
        { issue: "Pressure sensor faults", likelihood: "Medium", costRange: "€150–€350", severity: "Low" },
        { issue: "Efficiency loss over time", likelihood: "Very High", costRange: "€200–€400/yr", severity: "Moderate" },
        { issue: "Seal ageing", likelihood: "High", costRange: "€100–€300", severity: "Low" },
      ],
      community: {
        similarHomes: 2146,
        averageBoilerAge: 14,
        switchedToDH: 41,
        averageYearlySavings: 540,
        averageCO2Reduction: 38,
      },
      costs: {
        currentAnnual: 2180,
        districtHeatingAnnual: 1720,
        potentialSavings: 460,
        maintenanceSavings: 250,
        tenYearSavings: 7100,
      },
      sustainability: {
        currentCO2: 4.6,
        districtHeatingCO2: 2.7,
        estimatedReduction: 41,
        treesEquivalent: 87,
        carsRemoved: 0.6,
        co2SavedTonnes: 1.9,
      },
      recommendation: "Based on your Viessmann Vitodens 200-W, estimated age of 13 years and your location in Halle, we recommend considering a transition to District Heating within the next 3–5 years. Your current system still appears operational, but transitioning earlier could reduce long-term operating costs while lowering your environmental impact. District Heating is expected to remain available and expand in your area.",
    },
  },
  {
    id: "demo-2",
    name: "Buderus Logamax",
    subtitle: "Oil Heating — 2008",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
    result: {
      id: "demo-2",
      imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      name: "Buderus Logamax",
      manufacturer: "Buderus",
      model: "Logamax Plus GB142",
      heatingType: "Oil Boiler",
      fuel: "Heating Oil",
      installedYear: 2008,
      estimatedAge: 18,
      remainingLifespan: "2–4 Years",
      energyEfficiencyRating: "D",
      maintenanceRisk: "High",
      confidenceScore: 94,
      healthScore: 52,
      healthBreakdown: {
        efficiency: 45,
        reliability: 58,
        maintenance: 38,
        safety: 72,
        environmentalImpact: 28,
        districtHeatingCompatibility: 97,
      },
      insights: [
        "Your oil boiler is approximately 18 years old — well beyond the typical design life of 15 years for this class of system.",
        "Oil heating systems at this age typically operate at 15–20% lower efficiency than when new, leading to significantly higher fuel costs.",
        "Replacement parts for this model are becoming scarce, which may lead to extended downtime during winter months.",
        "Oil prices have risen 35% over the past 5 years, and your annual fuel cost is likely to continue increasing.",
        "Switching to district heating would eliminate your dependency on oil deliveries and price volatility.",
      ],
      commonIssues: [
        { issue: "Burner nozzle wear", likelihood: "Very High", costRange: "€200–€400", severity: "High" },
        { issue: "Heat exchanger corrosion", likelihood: "High", costRange: "€1,000–€2,500", severity: "High" },
        { issue: "Oil line degradation", likelihood: "Medium", costRange: "€300–€800", severity: "Moderate" },
        { issue: "Soot accumulation", likelihood: "Very High", costRange: "€150–€400", severity: "Moderate" },
        { issue: "Tank corrosion risk", likelihood: "High", costRange: "€2,000–€5,000", severity: "Critical" },
      ],
      community: {
        similarHomes: 1870,
        averageBoilerAge: 14,
        switchedToDH: 52,
        averageYearlySavings: 680,
        averageCO2Reduction: 45,
      },
      costs: {
        currentAnnual: 3120,
        districtHeatingAnnual: 1980,
        potentialSavings: 1140,
        maintenanceSavings: 400,
        tenYearSavings: 15400,
      },
      sustainability: {
        currentCO2: 6.8,
        districtHeatingCO2: 2.7,
        estimatedReduction: 60,
        treesEquivalent: 142,
        carsRemoved: 1.1,
        co2SavedTonnes: 4.1,
      },
      recommendation: "Your Buderus oil boiler is 18 years old and approaching the end of its service life. We strongly recommend planning a transition to District Heating within the next 1–2 years. The high maintenance risk, declining efficiency, and rising oil costs make this an ideal time to switch. District Heating is available in your area and could save you approximately €1,140 annually.",
    },
  },
  {
    id: "demo-3",
    name: "Vaillant ecoTEC",
    subtitle: "Condensing Boiler — 2018",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
    result: {
      id: "demo-3",
      imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
      name: "Vaillant ecoTEC",
      manufacturer: "Vaillant",
      model: "ecoTEC plus 837",
      heatingType: "Condensing Boiler",
      fuel: "Natural Gas",
      installedYear: 2018,
      estimatedAge: 8,
      remainingLifespan: "7–10 Years",
      energyEfficiencyRating: "A",
      maintenanceRisk: "Low",
      confidenceScore: 92,
      healthScore: 86,
      healthBreakdown: {
        efficiency: 91,
        reliability: 88,
        maintenance: 82,
        safety: 94,
        environmentalImpact: 65,
        districtHeatingCompatibility: 88,
      },
      insights: [
        "Your Vaillant condensing boiler is a relatively modern system at 8 years old with plenty of remaining service life.",
        "Condensing boilers are among the most efficient gas heating systems, operating at up to 98% efficiency when well-maintained.",
        "Your system's modern design means replacement parts will be readily available for the foreseeable future.",
        "While your current system is efficient, district heating still offers a 41% lower carbon footprint with no on-site maintenance.",
        "Consider district heating when your boiler reaches 12–15 years of age for optimal timing.",
      ],
      commonIssues: [
        { issue: "Condensate trap blockage", likelihood: "Low", costRange: "€80–€200", severity: "Low" },
        { issue: "Fan bearing wear", likelihood: "Low", costRange: "€200–€400", severity: "Low" },
        { issue: "PCB sensor drift", likelihood: "Low", costRange: "€150–€350", severity: "Low" },
      ],
      community: {
        similarHomes: 1580,
        averageBoilerAge: 14,
        switchedToDH: 35,
        averageYearlySavings: 380,
        averageCO2Reduction: 34,
      },
      costs: {
        currentAnnual: 1840,
        districtHeatingAnnual: 1460,
        potentialSavings: 380,
        maintenanceSavings: 180,
        tenYearSavings: 5600,
      },
      sustainability: {
        currentCO2: 3.8,
        districtHeatingCO2: 2.7,
        estimatedReduction: 29,
        treesEquivalent: 52,
        carsRemoved: 0.4,
        co2SavedTonnes: 1.1,
      },
      recommendation: "Your Vaillant ecoTEC is a modern, efficient system with many years of service life remaining. There is no urgent need to replace it. We recommend revisiting a transition to District Heating in 4–6 years, when your boiler approaches 12–15 years of age. In the meantime, enjoy your efficient system and keep up with annual maintenance.",
    },
  },
  {
    id: "demo-4",
    name: "Modern Heat Pump",
    subtitle: "Electric Heat Pump — 2023",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
    result: {
      id: "demo-4",
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
      name: "Modern Heat Pump",
      manufacturer: "Nibe",
      model: "S2125-12",
      heatingType: "Heat Pump",
      fuel: "Electricity",
      installedYear: 2023,
      estimatedAge: 2,
      remainingLifespan: "15–20 Years",
      energyEfficiencyRating: "A+",
      maintenanceRisk: "Very Low",
      confidenceScore: 90,
      healthScore: 94,
      healthBreakdown: {
        efficiency: 97,
        reliability: 95,
        maintenance: 92,
        safety: 98,
        environmentalImpact: 85,
        districtHeatingCompatibility: 72,
      },
      insights: [
        "Your heat pump is a modern, highly efficient system with a long remaining lifespan of 15–20 years.",
        "Heat pumps are among the most environmentally friendly heating options, especially when powered by renewable electricity.",
        "Your system requires minimal maintenance compared to gas or oil boilers — no annual flue checks or fuel deliveries needed.",
        "While district heating also offers low emissions, your heat pump already provides excellent environmental performance.",
        "Consider keeping your heat pump for its full lifespan; district heating may be a future option when replacement is needed.",
      ],
      commonIssues: [
        { issue: "Refrigerant pressure drop", likelihood: "Very Low", costRange: "€300–€600", severity: "Moderate" },
        { issue: "Compressor wear (long-term)", likelihood: "Very Low", costRange: "€1,500–€3,000", severity: "High" },
        { issue: "Fan motor bearing", likelihood: "Low", costRange: "€200–€400", severity: "Low" },
      ],
      community: {
        similarHomes: 890,
        averageBoilerAge: 14,
        switchedToDH: 18,
        averageYearlySavings: 120,
        averageCO2Reduction: 15,
      },
      costs: {
        currentAnnual: 1420,
        districtHeatingAnnual: 1300,
        potentialSavings: 120,
        maintenanceSavings: 80,
        tenYearSavings: 2000,
      },
      sustainability: {
        currentCO2: 1.2,
        districtHeatingCO2: 0.9,
        estimatedReduction: 25,
        treesEquivalent: 18,
        carsRemoved: 0.15,
        co2SavedTonnes: 0.3,
      },
      recommendation: "Your modern heat pump is an excellent, efficient system with minimal environmental impact. There is no need to consider a change at this point. Enjoy your system for the next 15–20 years. If circumstances change, district heating will remain an option in your area.",
    },
  },
];

const analysisStepKeys = [
  "heatscanAI.analysisSteps.scan",
  "heatscanAI.analysisSteps.manufacturer",
  "heatscanAI.analysisSteps.nameplate",
  "heatscanAI.analysisSteps.modelNumber",
  "heatscanAI.analysisSteps.installYear",
  "heatscanAI.analysisSteps.efficiency",
  "heatscanAI.analysisSteps.issues",
  "heatscanAI.analysisSteps.compare",
  "heatscanAI.analysisSteps.lifespan",
  "heatscanAI.analysisSteps.costs",
  "heatscanAI.analysisSteps.districtHeating",
  "heatscanAI.analysisSteps.recommendation",
  "heatscanAI.analysisSteps.complete",
];

function CircularGauge({ value, label, max = 100, color }: { value: number; label: string; max?: number; color: string }) {
  const r = 40;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-[100px] h-[100px]">
        <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90 absolute inset-0">
          <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-[#F1F5F9] dark:text-slate-800" />
          <motion.circle
            cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (value / max) * circumference }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-display font-bold" style={{ color }}>{value}</span>
        </div>
      </div>
      <span className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider text-center max-w-16 leading-tight">{label}</span>
    </div>
  );
}

const easeOut = [0.25, 0.1, 0.25, 1] as const;

export function HeatScanAIContent() {
  const { t } = useLocale();
  const [flowState, setFlowState] = useState<FlowState>("results");
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>("demo-3");
  const [result, setResult] = useState<HeatScanResult | null>(demoSystems[2].result);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showYearInput, setShowYearInput] = useState(false);
  const [installationYear, setInstallationYear] = useState(2018);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(demoSystems[2].imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const pendingDemoRef = useRef<string | null>(null);

  const startAnalysis = useCallback((demoId: string, year: number) => {
    const demo = demoSystems.find((d) => d.id === demoId);
    if (!demo) return;
    setSelectedDemoId(demoId);
    setShowYearInput(false);
    setFlowState("analyzing");
    setAnalysisStep(0);
    setProgress(0);

    const resultWithYear = {
      ...demo.result,
      installedYear: year,
      estimatedAge: 2026 - year,
    };

    const totalSteps = analysisStepKeys.length - 1;
    const stepDuration = (4000 + Math.random() * 2000) / totalSteps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnalysisStep(currentStep);
      setProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setResult(resultWithYear);
          setFlowState("results");
        }, 400);
      }
    }, stepDuration);
  }, []);

  const promptYear = useCallback((demoId: string) => {
    pendingDemoRef.current = demoId;
    const demo = demoSystems.find((d) => d.id === demoId);
    if (demo) {
      setInstallationYear(demo.result.installedYear);
      setUploadedImageUrl(demo.imageUrl);
    }
    setShowYearInput(true);
  }, []);

  const handleFileUpload = useCallback((_files: FileList | null) => {
    if (!_files || _files.length === 0) return;
    const file = _files[0];
    const url = URL.createObjectURL(file);
    setUploadedImageUrl(url);
    const randomDemo = demoSystems[Math.floor(Math.random() * demoSystems.length)];
    pendingDemoRef.current = randomDemo.id;
    setInstallationYear(randomDemo.result.installedYear);
    setShowYearInput(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleBookConsultation = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  const startCamera = useCallback(async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setShowCamera(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "heating-system.jpg", { type: "image/jpeg" });
        const url = URL.createObjectURL(file);
        setUploadedImageUrl(url);
        const randomDemo = demoSystems[Math.floor(Math.random() * demoSystems.length)];
        pendingDemoRef.current = randomDemo.id;
        setInstallationYear(randomDemo.result.installedYear);
        setShowYearInput(true);
      }
    }, "image/jpeg");
    stopCamera();
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="p-4 md:p-6 space-y-6"
    >
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#E40000", "#16A34A", "#2563EB", "#F59E0B", "#8B5CF6"][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: -10,
                }}
                animate={{
                  y: [0, window.innerHeight + 100],
                  x: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, 720 + Math.random() * 360],
                }}
                transition={{ duration: 2.5 + Math.random() * 1.5, ease: "easeIn" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <div className="relative max-w-lg w-full rounded-2xl overflow-hidden bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full aspect-[4/3] object-cover" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent">
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  {t("heatscanAI.camera.cancel")}
                </button>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#E40000]" />
                </button>
                <div className="w-16" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Year Input Modal */}
      <AnimatePresence>
        {showYearInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E40000]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-evh-dark dark:text-white">{t("heatscanAI.yearInput.title")}</p>
                  <p className="text-xs text-evh-gray-400 dark:text-slate-500 mt-0.5">{t("heatscanAI.yearInput.subtitle")}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-evh-gray-500 dark:text-slate-400 mb-1.5">{t("heatscanAI.yearInput.label")}</label>
                <input
                  type="number"
                  min="1980"
                  max="2026"
                  value={installationYear}
                  onChange={(e) => setInstallationYear(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-evh-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-evh-dark dark:text-white text-base font-semibold focus:border-[#E40000] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowYearInput(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-evh-gray-200 dark:border-slate-700 text-evh-dark dark:text-white text-sm font-semibold hover:bg-evh-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {t("heatscanAI.yearInput.cancel")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = pendingDemoRef.current;
                    if (id) startAnalysis(id, installationYear);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#E40000] text-white text-sm font-semibold hover:bg-[#cc0000] transition-colors"
                >
                  {t("heatscanAI.yearInput.analyse")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPLOAD STATE */}
      <AnimatePresence mode="wait">
        {flowState === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto pt-8 pb-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease: easeOut }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-evh-primary/10 dark:bg-evh-primary/20 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E40000] animate-pulse" />
                <span className="text-xs font-medium text-[#E40000] uppercase tracking-wider">{t("heatscanAI.upload.badge")}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: easeOut }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-evh-dark dark:text-white tracking-tight"
              >
                HeatScan <span className="text-[#E40000]">{t("heatscanAI.upload.titleHighlight")}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}
                className="mt-4 text-evh-gray-500 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              >
                {t("heatscanAI.upload.description")}
              </motion.p>
            </div>

            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: easeOut }}
              className="max-w-2xl mx-auto"
            >
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") fileInputRef.current?.click(); }}
                className={`
                  relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-500
                  ${dragOver
                    ? "border-[#E40000] bg-[#E40000]/5 dark:bg-[#E40000]/10 scale-[1.02]"
                    : "border-evh-gray-200 dark:border-slate-700 bg-evh-gray-50/50 dark:bg-slate-800/50 hover:border-evh-gray-300 dark:hover:border-slate-600"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <motion.div
                  animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E40000]/20 to-[#E40000]/5 dark:from-[#E40000]/30 dark:to-[#E40000]/10 flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </motion.div>
                <p className="text-lg font-semibold text-evh-dark dark:text-white mb-2">
                  {t("heatscanAI.upload.dropTitle")}
                </p>
                <p className="text-sm text-evh-gray-400 dark:text-slate-500 mb-6">
                  {t("heatscanAI.upload.dropSubtitle")}
                </p>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); startCamera(); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E40000] text-white text-sm font-semibold transition-all duration-300 hover:bg-[#cc0000] active:scale-[0.97] shadow-lg shadow-[#E40000]/20"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t("heatscanAI.upload.takePhoto")}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-evh-gray-200 dark:border-slate-700 text-evh-dark dark:text-white text-sm font-semibold transition-all duration-300 hover:border-evh-gray-300 dark:hover:border-slate-600 active:scale-[0.97]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t("heatscanAI.upload.uploadImage")}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-evh-gray-400 dark:text-slate-500">
                  <span className="px-2 py-1 rounded-md bg-evh-gray-100 dark:bg-slate-800">JPG</span>
                  <span className="px-2 py-1 rounded-md bg-evh-gray-100 dark:bg-slate-800">PNG</span>
                  <span className="px-2 py-1 rounded-md bg-evh-gray-100 dark:bg-slate-800">HEIC</span>
                  <span className="px-2 py-1 rounded-md bg-evh-gray-100 dark:bg-slate-800">PDF</span>
                </div>
              </div>
            </motion.div>

            {/* Demo Systems */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-center mb-6"
              >
                <p className="text-sm text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider font-medium">{t("heatscanAI.upload.tryDemo")}</p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {demoSystems.map((demo, i) => (
                  <motion.div
                    key={demo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: easeOut }}
                    onClick={() => promptYear(demo.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") promptYear(demo.id); }}
                    className="group cursor-pointer"
                  >
                    <Card hover>
                      <CardContent className="p-0">
                        <div className="aspect-[4/3] rounded-t-2xl overflow-hidden">
                          <img
                            src={demo.imageUrl}
                            alt={demo.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold text-evh-dark dark:text-white group-hover:text-[#E40000] transition-colors duration-300">{demo.name}</p>
                          <p className="text-xs text-evh-gray-400 dark:text-slate-500 mt-0.5">{demo.subtitle}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ANALYZING STATE */}
        {flowState === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg mx-auto py-16 md:py-24 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#E40000]/20 to-[#E40000]/5 dark:from-[#E40000]/30 dark:to-[#E40000]/10 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-2 border-[#E40000] border-t-transparent"
              />
            </motion.div>

            <motion.p
              key={analysisStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-display font-semibold text-evh-dark dark:text-white"
            >
              {t(analysisStepKeys[Math.min(analysisStep, analysisStepKeys.length - 1)])}
            </motion.p>

            <div className="mt-8 w-full bg-evh-gray-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#E40000] to-[#FF6B6B]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <p className="mt-4 text-sm text-evh-gray-400 dark:text-slate-500">
              {t("heatscanAI.analyzing.status")}
            </p>
          </motion.div>
        )}

        {/* RESULTS STATE */}
        {flowState === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 pb-12"
          >
            {/* Sticky Nav */}
            <div className="sticky top-0 z-40 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-evh-gray-100 dark:border-slate-800">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm font-medium text-evh-dark dark:text-white">{t("heatscanAI.sticky.title")}</span>
                  <span className="text-xs text-evh-gray-400 dark:text-slate-500">{t("heatscanAI.sticky.status")}</span>
                </div>
                <button
                  onClick={() => { setFlowState("upload"); setResult(null); setSelectedDemoId(null); setUploadedImageUrl(null); }}
                  className="text-sm text-evh-gray-400 dark:text-slate-500 hover:text-evh-dark dark:hover:text-white transition-colors"
                >
                  {t("heatscanAI.sticky.newScan")}
                </button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {/* Product Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-72 h-48 rounded-xl overflow-hidden shrink-0">
                        <img src={uploadedImageUrl || result.imageUrl} alt={result.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider font-medium mb-1">{t("heatscanAI.product.detectedSystem")}</p>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{result.manufacturer} {result.model}</h2>
                          </div>
                          <Badge variant="success" className="text-xs">{t("heatscanAI.product.confidence", { confidence: result.confidenceScore })}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { labelKey: "heatscanAI.product.labels.type", value: result.heatingType },
                            { labelKey: "heatscanAI.product.labels.fuel", value: result.fuel },
                            { labelKey: "heatscanAI.product.labels.installed", value: String(result.installedYear) },
                            { labelKey: "heatscanAI.product.labels.age", value: `${result.estimatedAge} ${t("heatscanAI.years")}` },
                            { labelKey: "heatscanAI.product.labels.remaining", value: result.remainingLifespan },
                            { labelKey: "heatscanAI.product.labels.efficiency", value: result.energyEfficiencyRating },
                            { labelKey: "heatscanAI.product.labels.maintenance", value: result.maintenanceRisk },
                          ].map((item) => (
                            <div key={item.labelKey} className="p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50">
                              <p className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t(item.labelKey)}</p>
                              <p className="text-sm font-semibold text-evh-dark dark:text-white mt-0.5">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Health Score + Gauges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
              >
                <div className="grid lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-1">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("heatscanAI.health.title")}</p>
                      <div className="relative w-40 h-40">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                          <circle cx="80" cy="80" r="68" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                          <motion.circle
                            cx="80" cy="80" r="68" fill="none" stroke={result.healthScore >= 70 ? "#16A34A" : result.healthScore >= 50 ? "#F59E0B" : "#E40000"} strokeWidth="8"
                            strokeDasharray={`${(result.healthScore / 100) * 2 * Math.PI * 68} ${2 * Math.PI * 68}`}
                            initial={{ strokeDasharray: `0 ${2 * Math.PI * 68}` }}
                            animate={{ strokeDasharray: `${(result.healthScore / 100) * 2 * Math.PI * 68} ${2 * Math.PI * 68}` }}
                            transition={{ duration: 1.5, ease: easeOut }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                              className="text-4xl font-display font-bold text-evh-dark dark:text-white"
                            >
                              {result.healthScore}
                            </motion.p>
                            <p className="text-xs text-evh-gray-400 dark:text-slate-500">/100</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardContent className="p-6">
                      <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-6">{t("heatscanAI.health.breakdown")}</p>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        <CircularGauge value={result.healthBreakdown.efficiency} label={t("heatscanAI.health.efficiency")} color="#2563EB" />
                        <CircularGauge value={result.healthBreakdown.reliability} label={t("heatscanAI.health.reliability")} color="#16A34A" />
                        <CircularGauge value={result.healthBreakdown.maintenance} label={t("heatscanAI.health.maintenance")} color="#F59E0B" />
                        <CircularGauge value={result.healthBreakdown.safety} label={t("heatscanAI.health.safety")} color="#8B5CF6" />
                        <CircularGauge value={result.healthBreakdown.environmentalImpact} label={t("heatscanAI.health.envImpact")} color="#06B6D4" />
                        <CircularGauge value={result.healthBreakdown.districtHeatingCompatibility} label={t("heatscanAI.health.dhReady")} color="#E40000" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: easeOut }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <svg className="w-5 h-5 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="text-sm font-semibold text-evh-dark dark:text-white">{t("heatscanAI.insights.title")}</p>
                    </div>
                    <div className="space-y-3">
                      {result.insights.map((insight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: easeOut }}
                          className="flex gap-3 p-3.5 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50"
                        >
                          <span className="text-sm shrink-0 mt-0.5">💡</span>
                          <p className="text-sm text-evh-gray-600 dark:text-slate-300 leading-relaxed">{insight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Common Issues */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: easeOut }}
              >
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-5">{t("heatscanAI.issues.title")}</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {result.commonIssues.map((issue, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: easeOut }}
                          className="p-4 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50 border border-evh-gray-100 dark:border-slate-700/50"
                        >
                          <p className="text-sm font-semibold text-evh-dark dark:text-white mb-3">{issue.issue}</p>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-evh-gray-400 dark:text-slate-500">{t("heatscanAI.issues.likelihood")}</span>
                              <span className={`font-medium ${
                                issue.likelihood === "Very Low" || issue.likelihood === "Low" ? "text-green-600 dark:text-green-400" :
                                issue.likelihood === "Medium" ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"
                              }`}>{issue.likelihood}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-evh-gray-400 dark:text-slate-500">{t("heatscanAI.issues.costRange")}</span>
                              <span className="font-medium text-evh-dark dark:text-white">{issue.costRange}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-evh-gray-400 dark:text-slate-500">{t("heatscanAI.issues.severity")}</span>
                              <Badge variant={issue.severity === "Critical" ? "warning" : issue.severity === "High" ? "warning" : "info"}>{issue.severity}</Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Community Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: easeOut }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <svg className="w-5 h-5 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm font-semibold text-evh-dark dark:text-white">{t("heatscanAI.community.title")}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <AnimatedCounter target={result.community.similarHomes} label={t("heatscanAI.community.similarHomes")} suffix="+" valueClassName="text-[#2563EB]" />
                      <AnimatedCounter target={result.community.averageBoilerAge} label={t("heatscanAI.community.avgBoilerAge")} suffix={` ${t("heatscanAI.years")}`} valueClassName="text-[#E40000]" />
                      <AnimatedCounter target={result.community.switchedToDH} label={t("heatscanAI.community.switchedToDH")} suffix="%" valueClassName="text-[#16A34A]" />
                      <AnimatedCounter target={result.community.averageYearlySavings} prefix="€" label={t("heatscanAI.community.avgYearlySavings")} valueClassName="text-[#16A34A]" />
                      <AnimatedCounter target={result.community.averageCO2Reduction} label={t("heatscanAI.community.avgCO2Reduction")} suffix="%" valueClassName="text-[#16A34A]" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cost Simulator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: easeOut }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <svg className="w-5 h-5 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-semibold text-evh-dark dark:text-white">{t("heatscanAI.costs.title")}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50">
                        <p className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">{t("heatscanAI.costs.currentAnnual")}</p>
                        <AnimatedCounter target={result.costs.currentAnnual} prefix="€" label="" valueClassName="text-[#E40000] text-2xl" />
                      </div>
                      <div className="p-4 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50">
                        <p className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">{t("heatscanAI.costs.districtHeating")}</p>
                        <AnimatedCounter target={result.costs.districtHeatingAnnual} prefix="€" label="" valueClassName="text-[#16A34A] text-2xl" />
                      </div>
                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <p className="text-[10px] text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">{t("heatscanAI.costs.potentialSavings")}</p>
                        <AnimatedCounter target={result.costs.potentialSavings} prefix="€" label="" valueClassName="text-[#16A34A] text-2xl" />
                      </div>
                      <div className="p-4 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50">
                        <p className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">{t("heatscanAI.costs.maintenanceSavings")}</p>
                        <AnimatedCounter target={result.costs.maintenanceSavings} prefix="€" label="" valueClassName="text-[#16A34A] text-2xl" />
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#E40000]/10 to-transparent border border-[#E40000]/20">
                        <p className="text-[10px] text-[#E40000] uppercase tracking-wider mb-1">{t("heatscanAI.costs.tenYearSavings")}</p>
                        <AnimatedCounter target={result.costs.tenYearSavings} prefix="€" label="" valueClassName="text-[#E40000] text-2xl" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50">
                      <p className="text-xs text-evh-gray-500 dark:text-slate-400 leading-relaxed">
                        {t("heatscanAI.costs.disclaimer")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sustainability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: easeOut }}
                className="grid md:grid-cols-2 gap-6"
              >
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-5">{t("heatscanAI.sustainability.co2Title")}</p>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-evh-dark dark:text-white font-medium">{t("heatscanAI.sustainability.currentSystem")}</span>
                          <span className="text-[#E40000] font-semibold">{result.sustainability.currentCO2} t CO₂/yr</span>
                        </div>
                        <div className="w-full bg-evh-gray-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[#E40000]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(result.sustainability.currentCO2 / 7) * 100}%` }}
                            transition={{ duration: 1, ease: easeOut }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-evh-dark dark:text-white font-medium">{t("heatscanAI.sustainability.districtHeating")}</span>
                          <span className="text-[#16A34A] font-semibold">{result.sustainability.districtHeatingCO2} t CO₂/yr</span>
                        </div>
                        <div className="w-full bg-evh-gray-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[#16A34A]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(result.sustainability.districtHeatingCO2 / 7) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: easeOut }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">{t("heatscanAI.sustainability.estimatedReduction")}</span>
                        <span className="text-2xl font-display font-bold text-[#16A34A]">-{result.sustainability.estimatedReduction}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50 text-center">
                        <p className="text-lg font-display font-bold text-[#16A34A]">{result.sustainability.treesEquivalent}</p>
                        <p className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("heatscanAI.sustainability.trees")}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50 text-center">
                        <p className="text-lg font-display font-bold text-[#2563EB]">{result.sustainability.carsRemoved}</p>
                        <p className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("heatscanAI.sustainability.cars")}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50 text-center">
                        <p className="text-lg font-display font-bold text-[#16A34A]">{result.sustainability.co2SavedTonnes}t</p>
                        <p className="text-[10px] text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("heatscanAI.sustainability.co2PerYear")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Why District Heating */}
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-5">{t("heatscanAI.whyDH.title")}</p>
                    <div className="space-y-3">
                      {[
                        { icon: "🔧", title: "No boiler replacement", desc: "No more unexpected boiler failures or replacement costs." },
                        { icon: "🏭", title: "No chimney maintenance", desc: "Eliminate annual chimney sweep inspections and cleaning." },
                        { icon: "🔋", title: "Lower maintenance", desc: "No moving parts, no combustion — virtually maintenance-free." },
                        { icon: "🏗️", title: "Long-term infrastructure", desc: "City-wide network with decades of reliable operation ahead." },
                        { icon: "🌿", title: "Reduced emissions", desc: "Up to 60% lower CO₂ emissions compared to oil or gas." },
                        { icon: "🏛️", title: "Supported by EVH", desc: "Local expertise, subsidies and installation support available." },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.65 + i * 0.06, duration: 0.4, ease: easeOut }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800/50"
                        >
                          <span className="text-lg shrink-0">{item.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-evh-dark dark:text-white">{item.title}</p>
                            <p className="text-xs text-evh-gray-400 dark:text-slate-500">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Personalised Recommendation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: easeOut }}
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E40000] to-[#FF6B6B] flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-evh-dark dark:text-white">{t("heatscanAI.recommendation.title")}</p>
                        <p className="text-xs text-evh-gray-400 dark:text-slate-500">{t("heatscanAI.recommendation.subtitle")}</p>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-[#E40000]/5 to-[#E40000]/10 dark:from-[#E40000]/10 dark:to-[#E40000]/5 border border-[#E40000]/20">
                      <p className="text-sm text-evh-gray-700 dark:text-slate-200 leading-relaxed">
                        {result.recommendation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: easeOut }}
              >
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-5">{t("heatscanAI.nextSteps.title")}</p>
                    <div className="space-y-0">
                      {[
                        { labelKey: "heatscanAI.nextSteps.items.0", done: true },
                        { labelKey: "heatscanAI.nextSteps.items.1", done: true },
                        { labelKey: "heatscanAI.nextSteps.items.2", done: false },
                        { labelKey: "heatscanAI.nextSteps.items.3", done: false },
                        { labelKey: "heatscanAI.nextSteps.items.4", done: false },
                        { labelKey: "heatscanAI.nextSteps.items.5", done: false },
                        { labelKey: "heatscanAI.nextSteps.items.6", done: false },
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-4 py-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            step.done ? "bg-green-100 dark:bg-green-900/30" : "bg-evh-gray-100 dark:bg-slate-800"
                          }`}>
                            {step.done ? (
                              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : i === 2 ? (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-3 h-3 rounded-full bg-[#E40000]"
                              />
                            ) : (
                              <span className="w-3 h-3 rounded-full bg-evh-gray-300 dark:bg-slate-600" />
                            )}
                          </div>
                          <span className={`text-sm ${step.done ? "text-evh-gray-400 dark:text-slate-500 line-through" : "text-evh-dark dark:text-white font-medium"}`}>
                            {t(step.labelKey)}
                          </span>
                          {i < 6 && (
                            <div className="ml-3 w-px h-6 bg-evh-gray-200 dark:bg-slate-700" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Booking CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: easeOut }}
                className="text-center py-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookConsultation}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#E40000] text-white text-base font-semibold rounded-2xl shadow-xl shadow-[#E40000]/25 hover:bg-[#cc0000] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t("heatscanAI.booking.cta")}
                </motion.button>
                <p className="mt-4 text-sm text-evh-gray-400 dark:text-slate-500">
                  {t("heatscanAI.booking.disclaimer")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
