'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// --- TYPES & INTERFACES ---
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: 'custom' | 'flash' | '';
  flashSelection: string;
  conceptDescription: string;
  placement: string;
  approxSize: string;
  referenceFiles: File[];
  preferredDays: string[];
  agreedToTerms: boolean;
}

const INITIAL_STATE: FormData = {
  fullName: '',
  email: '',
  phone: '',
  projectType: '',
  flashSelection: '',
  conceptDescription: '',
  placement: '',
  approxSize: '',
  referenceFiles: [],
  preferredDays: [],
  agreedToTerms: false,
};

const FLASH_OPTIONS = [
  { id: 'FLASH-01-RAVEN', label: 'FLASH-01-RAVEN - The Moon Phase Raven' },
  { id: 'FLASH-03-HEART', label: 'FLASH-03-HEART - Anatomical Heart & Wildflowers' },
  { id: 'FLASH-04-MOTH', label: 'FLASH-04-MOTH - Sacred Geometry Moth' },
  { id: 'FLASH-06-SERPENT', label: 'FLASH-06-SERPENT - Serpent & Ginkgo Leaves' },
];

const PLACEMENT_OPTIONS = [
  'Forearm (Inner / Outer)',
  'Upper Arm / Bicep / Shoulder',
  'Full Sleeve',
  'Calf / Shin',
  'Thigh',
  'Back (Upper / Lower / Full)',
  'Chest / Sternum',
  'Ribs / Side Torso',
  'Other (Specify in description)',
];

const DAYS_OF_WEEK = ['Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function BookingRequestForm() {
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- FORM VALIDATION ---
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (!formData.projectType) {
        newErrors.projectType = 'Please select a project type';
      }
      if (formData.projectType === 'flash' && !formData.flashSelection) {
        newErrors.flashSelection = 'Please select a flash design';
      }
    }

    if (currentStep === 3) {
      if (formData.projectType === 'custom' && !formData.conceptDescription.trim()) {
        newErrors.conceptDescription = 'Please describe your custom concept';
      }
      if (!formData.placement) {
        newErrors.placement = 'Please select a placement location';
      }
      if (!formData.approxSize.trim()) {
        newErrors.approxSize = 'Please specify an approximate size';
      }
    }

    if (currentStep === 4) {
      if (formData.preferredDays.length === 0) {
        newErrors.preferredDays = 'Please select at least one preferred day';
      }
    }

    if (currentStep === 5) {
      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = 'You must agree to the booking terms to proceed';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- NAVIGATION ---
  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(5)) {
      // Simulate API submission
      setIsSubmitted(true);
    }
  };

  // --- INPUT HANDLERS ---
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleProjectTypeSelect = (type: 'custom' | 'flash') => {
    setFormData((prev) => ({
      ...prev,
      projectType: type,
      // Clear conditional fields on change
      flashSelection: type === 'custom' ? '' : prev.flashSelection,
      conceptDescription: type === 'flash' ? '' : prev.conceptDescription,
    }));
    if (errors.projectType) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.projectType;
        return updated;
      });
    }
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.preferredDays.includes(day);
      const updatedDays = alreadySelected
        ? prev.preferredDays.filter((d) => d !== day)
        : [...prev.preferredDays, day];
      return { ...prev, preferredDays: updatedDays };
    });
    if (errors.preferredDays) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.preferredDays;
        return updated;
      });
    }
  };

  // --- FILE UPLOAD LOGIC ---
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const validFiles: File[] = [];
    const maxFiles = 3;
    const currentCount = formData.referenceFiles.length;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Check size (Max 5MB)
      if (file.size <= 5 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        if (validFiles.length + currentCount < maxFiles) {
          validFiles.push(file);
        }
      }
    }

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        referenceFiles: [...prev.referenceFiles, ...validFiles],
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      referenceFiles: prev.referenceFiles.filter((_, i) => i !== index),
    }));
  };

  return (
    <section
      id="booking-request-form"
      className="relative min-h-screen bg-[#0D0D0D] py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D97706]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: INTRO & LIVE RECAP */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#D97706] font-semibold block">
              Inquiry Pipeline
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] font-serif tracking-tight leading-tight">
              start your tattoo journey.
            </h2>
            <p className="text-[#A3A3A3] text-base leading-relaxed max-w-md font-sans">
              Please fill out the form below as accurately as possible. This structured inquiry allows me to understand your vision, estimate the time required, and provide an accurate quote.
            </p>
            <p className="text-xs text-[#737373] italic border-l-2 border-[#262626] pl-4 font-sans">
              *Note: Submitting this form does not guarantee an appointment. I review all inquiries weekly and will respond via email with next steps within 3-5 business days.
            </p>
          </motion.div>

          {/* LIVE SUMMARY CARD */}
          {!isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141414] border border-[#262626] rounded-xl p-6 space-y-6 shadow-xl hidden md:block"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5F5F5] border-b border-[#262626] pb-3">
                Live Request Summary
              </h3>
              <div className="space-y-4 text-xs font-mono text-[#A3A3A3]">
                <div className="flex justify-between py-1 border-b border-[#1C1C1C]">
                  <span>Client Name:</span>
                  <span className="text-[#F5F5F5] truncate max-w-[180px]">
                    {formData.fullName || '—'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1C1C1C]">
                  <span>Project Type:</span>
                  <span className="text-[#D97706] uppercase font-bold">
                    {formData.projectType || '—'}
                  </span>
                </div>
                {formData.projectType === 'flash' && (
                  <div className="flex justify-between py-1 border-b border-[#1C1C1C] text-amber-500">
                    <span>Design ID:</span>
                    <span className="truncate max-w-[180px]">{formData.flashSelection || '—'}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-[#1C1C1C]">
                  <span>Placement:</span>
                  <span className="text-[#F5F5F5] truncate max-w-[180px]">
                    {formData.placement || '—'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1C1C1C]">
                  <span>Est. Size:</span>
                  <span className="text-[#F5F5F5]">{formData.approxSize || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1C1C1C]">
                  <span>Files Uploaded:</span>
                  <span className="text-[#F5F5F5]">{formData.referenceFiles.length} / 3</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Preferred Days:</span>
                  <span className="text-[#F5F5F5] truncate max-w-[180px]">
                    {formData.preferredDays.join(', ') || '—'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: MULTI-STEP FORM CARD */}
        <div className="lg:col-span-7">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
            
            {/* SUCCESS STATE */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 md:p-12 text-center flex flex-col items-center justify-center h-full my-auto space-y-6"
                >
                  {/* Success Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] border border-[#10B981]/20 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#10B981] font-sans">
                    request successfully submitted!
                  </h3>

                  <div className="text-left text-[#A3A3A3] text-sm space-y-4 max-w-lg mx-auto bg-[#0D0D0D] p-6 rounded-xl border border-[#262626] leading-relaxed">
                    <p className="font-semibold text-[#F5F5F5] mb-2">
                      Thank you for sharing your vision with me. I have received your details and reference images.
                    </p>
                    <div className="space-y-3 font-sans">
                      <p>
                        <strong className="text-[#D97706] block">1. Review:</strong> I review all booking requests every Monday to ensure they fit my illustrative blackwork style.
                      </p>
                      <p>
                        <strong className="text-[#D97706] block">2. Response:</strong> You will receive an email from me within 3-5 business days. If your project is approved, this email will include a price quote, an estimated session length, and a link to select a date.
                      </p>
                      <p>
                        <strong className="text-[#D97706] block">3. Deposit:</strong> Once you select a date, you will have 48 hours to submit your deposit to lock in your appointment.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#737373] italic font-sans pt-4">
                    A copy of your submission has been sent to your email for your records.
                  </p>

                  <button
                    onClick={() => {
                      setFormData(INITIAL_STATE);
                      setStep(1);
                      setIsSubmitted(false);
                    }}
                    className="mt-6 px-6 py-3 border border-[#262626] text-[#F5F5F5] rounded-lg text-sm font-medium hover:bg-[#262626] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col">
                  
                  {/* PROGRESS BAR */}
                  <div className="px-8 pt-8">
                    <div className="flex items-center justify-between text-xs font-mono text-[#737373] mb-3">
                      <span>STEP {step} OF 5</span>
                      <span className="text-[#D97706] font-semibold">
                        {Math.round((step / 5) * 100)}% COMPLETE
                      </span>
                    </div>
                    <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#D97706]"
                        initial={{ width: '20%' }}
                        animate={{ width: `${(step / 5) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* FORM BODY */}
                  <form onSubmit={handleSubmit} className="p-8 flex-1 flex flex-col justify-between">
                    <div className="overflow-hidden relative min-h-[340px] flex items-center">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={step}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="w-full space-y-6"
                        >
                          {/* STEP 1: CONTACT INFORMATION */}
                          {step === 1 && (
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">
                                Step 1: Contact Information
                              </h4>
                              
                              <div className="space-y-2">
                                <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                  Full Name *
                                </label>
                                <input
                                  type="text"
                                  id="fullName"
                                  name="fullName"
                                  placeholder="Jane Doe"
                                  value={formData.fullName}
                                  onChange={handleTextChange}
                                  className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#525252] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
                                />
                                {errors.fullName && (
                                  <p className="text-red-500 text-xs font-mono">{errors.fullName}</p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="jane.doe@example.com"
                                  value={formData.email}
                                  onChange={handleTextChange}
                                  className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#525252] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
                                />
                                <span className="text-[11px] text-[#737373] block mt-1">
                                  I will respond to this email address. Please double-check it.
                                </span>
                                {errors.email && (
                                  <p className="text-red-500 text-xs font-mono">{errors.email}</p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                  Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  placeholder="(555) 000-0000"
                                  value={formData.phone}
                                  onChange={handleTextChange}
                                  className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#525252] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
                                />
                                {errors.phone && (
                                  <p className="text-red-500 text-xs font-mono">{errors.phone}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* STEP 2: PROJECT TYPE */}
                          {step === 2 && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">
                                  Step 2: Project Type
                                </h4>
                                <p className="text-xs text-[#A3A3A3] mb-4">
                                  Choose custom illustrative work or select from retired-once pre-drawn flash art.
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                  type="button"
                                  onClick={() => handleProjectTypeSelect('custom')}
                                  className={`flex flex-col items-start p-5 rounded-xl border text-left transition-all ${
                                    formData.projectType === 'custom'
                                      ? 'border-[#D97706] bg-[#D97706]/5'
                                      : 'border-[#262626] bg-[#0D0D0D] hover:border-[#525252]'
                                  }`}
                                >
                                  <span className={`text-xs font-mono mb-1 ${formData.projectType === 'custom' ? 'text-[#D97706]' : 'text-[#737373]'}`}>
                                    Bespoke Design
                                  </span>
                                  <span className="text-sm font-semibold text-[#F5F5F5] mb-1">
                                    Custom Tattoo Design
                                  </span>
                                  <span className="text-xs text-[#A3A3A3] leading-relaxed">
                                    Collaborative project matching your exact concepts to anatomical flow.
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleProjectTypeSelect('flash')}
                                  className={`flex flex-col items-start p-5 rounded-xl border text-left transition-all ${
                                    formData.projectType === 'flash'
                                      ? 'border-[#D97706] bg-[#D97706]/5'
                                      : 'border-[#262626] bg-[#0D0D0D] hover:border-[#525252]'
                                  }`}
                                >
                                  <span className={`text-xs font-mono mb-1 ${formData.projectType === 'flash' ? 'text-[#D97706]' : 'text-[#737373]'}`}>
                                    Pre-Drawn Artwork
                                  </span>
                                  <span className="text-sm font-semibold text-[#F5F5F5] mb-1">
                                    Pre-Drawn Flash Art
                                  </span>
                                  <span className="text-xs text-[#A3A3A3] leading-relaxed">
                                    Tattooed only once. Priority scheduling, bypass custom design phases.
                                  </span>
                                </button>
                              </div>
                              {errors.projectType && (
                                <p className="text-red-500 text-xs font-mono">{errors.projectType}</p>
                              )}

                              {/* CONDITIONAL FLASH DROPDOWN */}
                              {formData.projectType === 'flash' && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="space-y-2 mt-4"
                                >
                                  <label htmlFor="flashSelection" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                    Flash Design Selection *
                                  </label>
                                  <select
                                    id="flashSelection"
                                    name="flashSelection"
                                    value={formData.flashSelection}
                                    onChange={handleTextChange}
                                    className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg px-4 py-3 text-sm text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
                                  >
                                    <option value="">-- Choose available design --</option>
                                    {FLASH_OPTIONS.map((opt) => (
                                      <option key={opt.id} value={opt.id}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.flashSelection && (
                                    <p className="text-red-500 text-xs font-mono">{errors.flashSelection}</p>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          )}

                          {/* STEP 3: DESIGN DETAILS */}
                          {step === 3 && (
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-[#F5F5F5]">
                                Step 3: Design Details
                              </h4>

                              {/* CONDITIONAL CUSTOM CONCEPT DESCRIPTION */}
                              {formData.projectType === 'custom' && (
                                <div className="space-y-2">
                                  <label htmlFor="conceptDescription" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                    Describe Your Concept *
                                  </label>
                                  <textarea
                                    id="conceptDescription"
                                    name="conceptDescription"
                                    rows={4}
                                    placeholder="Describe your design idea, including specific elements, the general mood, and any symbolic meanings you want to incorporate..."
                                    value={formData.conceptDescription}
                                    onChange={handleTextChange}
                                    className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#525252] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all resize-none"
                                  />
                                  {errors.conceptDescription && (
                                    <p className="text-red-500 text-xs font-mono">{errors.conceptDescription}</p>
                                  )}
                                </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label htmlFor="placement" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                    Desired Placement *
                                  </label>
                                  <select
                                    id="placement"
                                    name="placement"
                                    value={formData.placement}
                                    onChange={handleTextChange}
                                    className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg px-4 py-3 text-sm text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
                                  >
                                    <option value="">-- Select Placement --</option>
                                    {PLACEMENT_OPTIONS.map((opt) => (
                                      <option key={opt} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.placement && (
                                    <p className="text-red-500 text-xs font-mono">{errors.placement}</p>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <label htmlFor="approxSize" className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                    Approximate Size (in inches) *
                                  </label>
                                  <input
                                    type="text"
                                    id="approxSize"
                                    name="approxSize"
                                    placeholder="e.g., 5 inches tall by 3 inches wide"
                                    value={formData.approxSize}
                                    onChange={handleTextChange}
                                    className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#525252] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
                                  />
                                  {errors.approxSize && (
                                    <p className="text-red-500 text-xs font-mono">{errors.approxSize}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* STEP 4: REFERENCES & AVAILABILITY */}
                          {step === 4 && (
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-[#F5F5F5]">
                                Step 4: References & Availability
                              </h4>

                              {/* Upload Zone */}
                              <div className="space-y-2">
                                <span className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                  Upload Reference Images & Placement Photo
                                </span>
                                <span className="text-[11px] text-[#737373] block">
                                  Upload up to 3 images. Please include 1-2 design reference images and 1 clear photo of the area of your body where you want the tattoo placed (taken in good lighting).
                                </span>

                                <div
                                  onDragOver={handleDragOver}
                                  onDragLeave={handleDragLeave}
                                  onDrop={handleDrop}
                                  onClick={triggerFileInput}
                                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                                    isDragging
                                      ? 'border-[#D97706] bg-[#D97706]/5'
                                      : 'border-[#262626] bg-[#0D0D0D] hover:border-[#525252]'
                                  }`}
                                >
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => handleFiles(e.target.files)}
                                    multiple
                                    accept=".jpg,.jpeg,.png"
                                    className="hidden"
                                  />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 mx-auto text-[#737373] mb-2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                  </svg>
                                  <p className="text-xs text-[#F5F5F5] font-medium">
                                    Drag & drop your images here, or <span className="text-[#D97706] underline">click to browse</span>.
                                  </p>
                                  <p className="text-[10px] text-[#737373] mt-1">
                                    Max 5MB per file. Formats: JPG, PNG
                                  </p>
                                </div>

                                {/* List of uploaded files */}
                                {formData.referenceFiles.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.referenceFiles.map((file, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-2 bg-[#1C1C1C] border border-[#262626] px-3 py-1.5 rounded-lg text-xs"
                                      >
                                        <span className="text-[#A3A3A3] max-w-[120px] truncate">
                                          {file.name}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(idx);
                                          }}
                                          className="text-[#737373] hover:text-red-500 transition-colors"
                                        >
                                          &times;
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Availability */}
                              <div className="space-y-2 pt-2">
                                <span className="block text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                                  Preferred Days for Session *
                                </span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {DAYS_OF_WEEK.map((day) => {
                                    const checked = formData.preferredDays.includes(day);
                                    return (
                                      <label
                                        key={day}
                                        className={`flex items-center gap-2 p-3 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
                                          checked
                                            ? 'border-[#D97706] bg-[#D97706]/5 text-[#F5F5F5]'
                                            : 'border-[#262626] bg-[#0D0D0D] text-[#737373] hover:border-[#525252]'
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          onChange={() => handleCheckboxChange(day)}
                                          className="sr-only"
                                        />
                                        <div
                                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                                            checked
                                              ? 'border-[#D97706] bg-[#D97706]'
                                              : 'border-[#525252] bg-transparent'
                                          }`}
                                        >
                                          {checked && (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              strokeWidth={3}
                                              stroke="currentColor"
                                              className="w-2.5 h-2.5 text-[#0D0D0D]"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                              />
                                            </svg>
                                          )}
                                        </div>
                                        {day}
                                      </label>
                                    );
                                  })}
                                </div>
                                {errors.preferredDays && (
                                  <p className="text-red-500 text-xs font-mono">{errors.preferredDays}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* STEP 5: FINAL AGREEMENT */}
                          {step === 5 && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">
                                  Step 5: Final Agreement
                                </h4>
                                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                                  You are almost done. Please review our deposit policy and secure your request submission.
                                </p>
                              </div>

                              <div className="bg-[#0D0D0D] border border-[#262626] rounded-xl p-5 space-y-4 text-xs leading-relaxed text-[#A3A3A3]">
                                <h5 className="font-semibold text-[#F5F5F5] uppercase tracking-wider text-[11px]">
                                  Deposits & Finalizing Terms:
                                </h5>
                                <ul className="space-y-2 list-disc list-inside">
                                  <li>
                                    <strong className="text-[#D97706]">$100 deposit</strong> required for flash designs.
                                  </li>
                                  <li>
                                    <strong className="text-[#D97706]">$200 deposit</strong> required for custom designs.
                                  </li>
                                  <li>
                                    Deposits are <span className="text-[#F5F5F5] underline">strictly non-refundable</span> and are subtracted from the final cost of your tattoo on session day.
                                  </li>
                                  <li>
                                    Rescheduling requires at least 48 hours notice.
                                  </li>
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={formData.agreedToTerms}
                                    onChange={(e) => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        agreedToTerms: e.target.checked,
                                      }));
                                      if (errors.agreedToTerms) {
                                        setErrors((prev) => {
                                          const updated = { ...prev };
                                          delete updated.agreedToTerms;
                                          return updated;
                                        });
                                      }
                                    }}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-all flex-shrink-0 ${
                                      formData.agreedToTerms
                                        ? 'border-[#D97706] bg-[#D97706]'
                                        : 'border-[#262626] bg-[#0D0D0D] group-hover:border-[#525252]'
                                    }`}
                                  >
                                    {formData.agreedToTerms && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={3}
                                        stroke="currentColor"
                                        className="w-3.5 h-3.5 text-[#0D0D0D]"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M4.5 12.75l6 6 9-13.5"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <span className="text-xs text-[#A3A3A3] select-none leading-relaxed">
                                    I understand that deposits are strictly non-refundable and that submitting this form does not guarantee an appointment. *
                                  </span>
                                </label>
                                {errors.agreedToTerms && (
                                  <p className="text-red-500 text-xs font-mono mt-1">{errors.agreedToTerms}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* ACTIONS BAR */}
                    <div className="flex items-center justify-between border-t border-[#262626] pt-6 mt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`px-5 py-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                          step === 1
                            ? 'text-[#525252] cursor-not-allowed'
                            : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#1C1C1C]'
                        }`}
                      >
                        &larr; Back
                      </button>

                      {step < 5 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-[#0D0D0D] font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-lg shadow-[#D97706]/10 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                        >
                          Next Step &rarr;
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-8 py-3 bg-[#D97706] hover:bg-[#B45309] text-[#0D0D0D] font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-lg shadow-[#D97706]/15 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                        >
                          Submit Booking Request
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}