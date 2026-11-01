"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Search,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  Ban,
  LogIn,
  LogOut,
  BedDouble,
  Calendar,
  User,
  Phone,
  Mail,
  DollarSign,
  Image as ImageIcon,
  Video,
  RefreshCw,
  Printer,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Building,
  MapPin,
  Eye,
  FileText,
  Check,
  AlertCircle,
  Upload,
  Layers,
} from "lucide-react";
import {
  Reservation,
  SiteMediaConfig,
  getStoredReservations,
  saveReservations,
  addReservation,
  updateReservationStatus,
  deleteReservation,
  resetReservationsToDefault,
  exportReservationsCSV,
  getStoredMedia,
  saveStoredMedia,
  resetMediaToDefault,
} from "@/lib/adminStore";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AdminPanelModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "media" | "analytics" | "inventory">("orders");

  // Reservations Data
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Selected Order Folio
  const [selectedOrder, setSelectedOrder] = useState<Reservation | null>(null);

  // Manual Add Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBranch, setNewBranch] = useState("chennai");
  const [newRoomType, setNewRoomType] = useState("Deluxe Luxury AC Room");
  const [newRate, setNewRate] = useState("4499");
  const [newCheckIn, setNewCheckIn] = useState("");
  const [newNights, setNewNights] = useState("2");
  const [newGuests, setNewGuests] = useState("2 Guests");
  const [newNotes, setNewNotes] = useState("");

  // Media Config State
  const [mediaConfig, setMediaConfig] = useState<SiteMediaConfig>(getStoredMedia());
  const [mediaSaveSuccess, setMediaSaveSuccess] = useState(false);

  // Load Initial Data & Listeners
  useEffect(() => {
    setReservations(getStoredReservations());
    setMediaConfig(getStoredMedia());

    // Shortcut: Ctrl + M or Cmd + M
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        if (selectedOrder) {
          setSelectedOrder(null);
        } else if (isAddOpen) {
          setIsAddOpen(false);
        } else {
          setIsOpen(false);
        }
      }
    };

    const handleCustomOpen = () => setIsOpen(true);
    const handleReservationsUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<Reservation[]>;
      if (customEvent.detail) setReservations(customEvent.detail);
      else setReservations(getStoredReservations());
    };
    const handleMediaUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<SiteMediaConfig>;
      if (customEvent.detail) setMediaConfig(customEvent.detail);
      else setMediaConfig(getStoredMedia());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-admin-panel", handleCustomOpen);
    window.addEventListener("br-reservations-updated", handleReservationsUpdated);
    window.addEventListener("br-media-updated", handleMediaUpdated);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-admin-panel", handleCustomOpen);
      window.removeEventListener("br-reservations-updated", handleReservationsUpdated);
      window.removeEventListener("br-media-updated", handleMediaUpdated);
    };
  }, [isOpen, selectedOrder, isAddOpen]);

  // Filtered Reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const matchesSearch =
        r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone.includes(searchTerm) ||
        r.roomType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBranch =
        branchFilter === "all" || r.branchId === branchFilter;

      const matchesStatus =
        statusFilter === "all" || r.status === statusFilter;

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [reservations, searchTerm, branchFilter, statusFilter]);

  // Analytics Metrics
  const metrics = useMemo(() => {
    const valid = reservations.filter((r) => r.status !== "Cancelled");
    const totalRevenue = valid.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    const totalBookings = reservations.length;
    const checkedInCount = reservations.filter((r) => r.status === "Checked In").length;
    const pendingCount = reservations.filter((r) => r.status === "Pending").length;
    const confirmedCount = reservations.filter((r) => r.status === "Confirmed").length;

    // By branch
    const puduRevenue = valid.filter((r) => r.branchId === "puducherry").reduce((acc, curr) => acc + curr.totalAmount, 0);
    const tindiRevenue = valid.filter((r) => r.branchId === "tindivanam").reduce((acc, curr) => acc + curr.totalAmount, 0);
    const chennaiRevenue = valid.filter((r) => r.branchId === "chennai").reduce((acc, curr) => acc + curr.totalAmount, 0);

    return {
      totalRevenue,
      totalBookings,
      checkedInCount,
      pendingCount,
      confirmedCount,
      puduRevenue,
      tindiRevenue,
      chennaiRevenue,
    };
  }, [reservations]);

  // Handle Status Update
  const handleStatusChange = (id: string, newStatus: Reservation["status"]) => {
    updateReservationStatus(id, newStatus);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete reservation ${id}?`)) {
      deleteReservation(id);
      if (selectedOrder?.id === id) setSelectedOrder(null);
    }
  };

  // Handle Manual Add Reservation
  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newPhone.trim()) {
      alert("Please provide guest name and contact phone.");
      return;
    }

    const rateNum = parseInt(newRate, 10) || 4499;
    const nightsNum = parseInt(newNights, 10) || 1;
    const branchNames: Record<string, string> = {
      puducherry: "Luxury Hotel (Pondicherry)",
      tindivanam: "Luxury Hotel (Tindivanam)",
      chennai: "Luxury Hotel (Chennai)",
    };

    const newRes: Reservation = {
      id: `BRV-${Math.floor(100000 + Math.random() * 900000)}`,
      guestName: newGuestName.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim() || `${newGuestName.toLowerCase().replace(/[^a-z0-9]/g, "")}@hotelguest.com`,
      branchId: newBranch,
      branchName: branchNames[newBranch] || "Chennai Flagship Metro",
      roomType: newRoomType,
      rate: `₹${rateNum.toLocaleString("en-IN")}`,
      rateNumeric: rateNum,
      checkIn: newCheckIn || "Today",
      checkOut: `${nightsNum} Night(s) Stay`,
      nights: nightsNum,
      guests: newGuests,
      totalAmount: rateNum * nightsNum,
      status: "Confirmed",
      paymentStatus: "Pay at Hotel",
      specialRequest: newNotes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    addReservation(newRes);
    setIsAddOpen(false);
    setNewGuestName("");
    setNewPhone("");
    setNewEmail("");
    setNewNotes("");
  };

  // Handle File Upload to Data URL
  const handleFileUpload = (
    key: keyof SiteMediaConfig,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setMediaConfig((prev) => ({
          ...prev,
          [key]: reader.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Media Changes
  const handleSaveMedia = () => {
    saveStoredMedia(mediaConfig);
    setMediaSaveSuccess(true);
    setTimeout(() => setMediaSaveSuccess(false), 3000);
  };

  // Reset Media
  const handleResetMedia = () => {
    if (confirm("Reset all website photos and videos back to default luxury assets?")) {
      const def = resetMediaToDefault();
      setMediaConfig(def);
      setMediaSaveSuccess(true);
      setTimeout(() => setMediaSaveSuccess(false), 3000);
    }
  };

  return (
    <>
      {/* Main Admin Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-6 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-7xl h-[94vh] rounded-3xl border border-gold/45 bg-[#0c0806] text-warm-white shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#140e0a] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold via-[#e6c687] to-[#a87932] text-[#1a120b] shadow-md">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-base sm:text-lg font-bold tracking-wider text-warm-white">
                        LUXURY HOTEL
                      </h2>
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Admin Live
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 tracking-wider">
                      Master Operations &amp; Media Control Desk • Shortcut: <kbd className="text-gold font-mono">Ctrl + M</kbd>
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 rounded-2xl bg-black/40 border border-white/10 p-1 my-2 sm:my-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      activeTab === "orders"
                        ? "bg-gradient-to-r from-gold to-[#c79a4d] text-[#1a120b] shadow-md"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Reservations ({reservations.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("media")}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      activeTab === "media"
                        ? "bg-gradient-to-r from-gold to-[#c79a4d] text-[#1a120b] shadow-md"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    <span>Photos &amp; Videos</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("analytics")}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      activeTab === "analytics"
                        ? "bg-gradient-to-r from-gold to-[#c79a4d] text-[#1a120b] shadow-md"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span>Analytics</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("inventory")}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      activeTab === "inventory"
                        ? "bg-gradient-to-r from-gold to-[#c79a4d] text-[#1a120b] shadow-md"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Rooms &amp; Rates</span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold hover:text-[#1a120b] transition-all cursor-pointer shrink-0"
                  aria-label="Close Admin Modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Main Content Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* ========================================================= */}
                {/* TAB 1: RESERVATIONS & ORDERS                             */}
                {/* ========================================================= */}
                {activeTab === "orders" && (
                  <div className="space-y-6">
                    {/* Top KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                          Total Revenue (INR)
                        </span>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-gold">
                            ₹{metrics.totalRevenue.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-medium">
                            +18.4%
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                          Total Bookings
                        </span>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-warm-white">
                            {metrics.totalBookings}
                          </span>
                          <span className="text-[10px] text-gold font-medium">
                            All Branches
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                          Checked-In In-House
                        </span>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                            {metrics.checkedInCount} Rooms
                          </span>
                          <span className="text-[10px] text-emerald-400/80 font-medium">
                            Active Stays
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                          Pending Confirmation
                        </span>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                            {metrics.pendingCount} Pending
                          </span>
                          <span className="text-[10px] text-amber-400/80 font-medium">
                            Action Needed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Filter & Action Toolbar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#130d0a] p-3 rounded-2xl border border-white/10">
                      {/* Search */}
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search by Guest Name, Phone, Ref ID, or Room..."
                          className="w-full rounded-xl bg-black/40 border border-white/15 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-gold focus:outline-none"
                        />
                      </div>

                      {/* Branch Filter */}
                      <div className="flex items-center gap-1 text-xs">
                        {["all", "puducherry", "tindivanam", "chennai"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBranchFilter(b)}
                            className={`rounded-lg px-2.5 py-1.5 uppercase font-medium tracking-wider transition-all cursor-pointer ${
                              branchFilter === b
                                ? "bg-gold text-[#1a120b] font-bold"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            {b === "all" ? "All" : b.slice(0, 4)}
                          </button>
                        ))}
                      </div>

                      {/* Status Filter */}
                      <div className="flex items-center gap-1 text-xs">
                        {["all", "Confirmed", "Checked In", "Pending"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setStatusFilter(s)}
                            className={`rounded-lg px-2 py-1.5 uppercase font-medium tracking-wider transition-all cursor-pointer ${
                              statusFilter === s
                                ? "bg-white/20 text-white font-bold"
                                : "text-white/50 hover:text-white"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddOpen(true)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold to-[#c79a4d] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#1a120b] hover:brightness-105 transition-all cursor-pointer shrink-0"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>New Order</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => exportReservationsCSV(filteredReservations)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-wider text-white hover:bg-white/10 transition-all cursor-pointer shrink-0"
                          title="Export CSV"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden md:inline">CSV</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Reset reservations to realistic sample hotel data?")) {
                              resetReservationsToDefault();
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 p-2 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                          title="Reset Sample Data"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Reservations Table */}
                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#120c09]">
                      <table className="w-full text-left text-xs text-white/80">
                        <thead className="bg-[#1b120c] text-[10px] uppercase tracking-[0.2em] text-white/50 border-b border-white/10">
                          <tr>
                            <th className="py-3 px-4 font-semibold">Ref ID</th>
                            <th className="py-3 px-4 font-semibold">Guest</th>
                            <th className="py-3 px-4 font-semibold">Branch &amp; Room</th>
                            <th className="py-3 px-4 font-semibold">Stay Dates</th>
                            <th className="py-3 px-4 font-semibold">Amount</th>
                            <th className="py-3 px-4 font-semibold">Status</th>
                            <th className="py-3 px-4 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredReservations.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-white/40">
                                No reservations match your search or filter.
                              </td>
                            </tr>
                          ) : (
                            filteredReservations.map((res) => {
                              const statusColors: Record<string, string> = {
                                Confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
                                "Checked In": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                                Pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
                                "Checked Out": "bg-white/10 text-white/60 border-white/20",
                                Cancelled: "bg-rose-500/15 text-rose-400 border-rose-500/30",
                              };

                              return (
                                <tr
                                  key={res.id}
                                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                                  onClick={() => setSelectedOrder(res)}
                                >
                                  {/* Ref ID */}
                                  <td className="py-3.5 px-4 font-mono font-bold text-gold">
                                    {res.id}
                                  </td>

                                  {/* Guest Info */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-semibold text-warm-white">
                                      {res.guestName}
                                    </div>
                                    <div className="text-[11px] text-white/50 flex items-center gap-2 mt-0.5">
                                      <span>{res.phone}</span>
                                    </div>
                                  </td>

                                  {/* Branch & Room */}
                                  <td className="py-3.5 px-4">
                                    <div className="text-white/90 font-medium">
                                      {res.roomType}
                                    </div>
                                    <div className="text-[11px] text-gold/80 flex items-center gap-1 mt-0.5">
                                      <MapPin className="h-3 w-3" />
                                      <span>{res.branchName}</span>
                                    </div>
                                  </td>

                                  {/* Stay Dates */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-medium text-white/90">
                                      {res.checkIn} → {res.checkOut}
                                    </div>
                                    <div className="text-[11px] text-white/50">
                                      {res.nights} Nights • {res.guests}
                                    </div>
                                  </td>

                                  {/* Total Price */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-mono font-bold text-warm-white">
                                      ₹{res.totalAmount.toLocaleString("en-IN")}
                                    </div>
                                    <div className="text-[10px] text-white/50 uppercase tracking-wider">
                                      {res.paymentStatus}
                                    </div>
                                  </td>

                                  {/* Status */}
                                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                                    <select
                                      value={res.status}
                                      onChange={(e) =>
                                        handleStatusChange(
                                          res.id,
                                          e.target.value as Reservation["status"]
                                        )
                                      }
                                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider cursor-pointer bg-black/60 ${
                                        statusColors[res.status] || "border-white/20 text-white"
                                      }`}
                                    >
                                      <option value="Confirmed">Confirmed</option>
                                      <option value="Checked In">Checked In</option>
                                      <option value="Pending">Pending</option>
                                      <option value="Checked Out">Checked Out</option>
                                      <option value="Cancelled">Cancelled</option>
                                    </select>
                                  </td>

                                  {/* Actions */}
                                  <td
                                    className="py-3.5 px-4 text-right"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => setSelectedOrder(res)}
                                        className="rounded-lg p-1.5 text-white/60 hover:text-gold hover:bg-white/10 transition-colors"
                                        title="View Full Folio"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDelete(res.id)}
                                        className="rounded-lg p-1.5 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                        title="Delete Order"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB 2: PHOTOS & VIDEOS MANAGER                            */}
                {/* ========================================================= */}
                {activeTab === "media" && (
                  <div className="space-y-8">
                    {/* Top Alert & Save Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-gold/15 via-white/5 to-transparent border border-gold/30 p-4 rounded-2xl">
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-gold tracking-wider uppercase">
                          Live Media &amp; Footage Asset Manager
                        </h3>
                        <p className="text-xs text-white/70 mt-1">
                          Update hero background videos, cover images, and room photos. Changes apply instantly across the website and persist in local storage.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {mediaSaveSuccess && (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                            <Check className="h-3.5 w-3.5" />
                            Applied Successfully!
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={handleSaveMedia}
                          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-[#c79a4d] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a120b] hover:brightness-105 transition-all shadow-md cursor-pointer"
                        >
                          <Check className="h-4 w-4" />
                          <span>Save &amp; Apply All</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetMedia}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-xs uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                          title="Restore Factory Media Defaults"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>

                    {/* 1. Home Hero 3-Branch Video/Poster Slides */}
                    <div className="space-y-4">
                      <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                        <h4 className="font-display text-sm font-semibold text-warm-white tracking-wider uppercase flex items-center gap-2">
                          <Video className="h-4 w-4 text-gold" />
                          <span>Home Page Hero Slides (3 Branches)</span>
                        </h4>
                        <span className="text-[11px] text-white/50">Video MP4 &amp; Poster Images</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Puducherry Slide */}
                        <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 space-y-3">
                          <div className="flex items-center justify-between text-xs font-semibold text-gold">
                            <span>1. Puducherry Residency</span>
                            <span className="text-[10px] text-white/40 uppercase">Slide 1</span>
                          </div>

                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-white/10">
                            {mediaConfig.heroPuducherryVideo ? (
                              <video
                                src={mediaConfig.heroPuducherryVideo}
                                poster={mediaConfig.heroPuducherryPoster}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-white/30 text-xs">
                                No video
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                                Video MP4 URL:
                              </label>
                              <input
                                type="text"
                                value={mediaConfig.heroPuducherryVideo}
                                onChange={(e) =>
                                  setMediaConfig({
                                    ...mediaConfig,
                                    heroPuducherryVideo: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-black/50 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                                Poster Image URL:
                              </label>
                              <input
                                type="text"
                                value={mediaConfig.heroPuducherryPoster}
                                onChange={(e) =>
                                  setMediaConfig({
                                    ...mediaConfig,
                                    heroPuducherryPoster: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-black/50 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="cursor-pointer inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold hover:underline mt-1">
                                <Upload className="h-3 w-3" />
                                <span>Upload Poster File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload("heroPuducherryPoster", e)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Tindivanam Slide */}
                        <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 space-y-3">
                          <div className="flex items-center justify-between text-xs font-semibold text-gold">
                            <span>2. Tindivanam Restaurant</span>
                            <span className="text-[10px] text-white/40 uppercase">Slide 2</span>
                          </div>

                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-white/10">
                            {mediaConfig.heroTindivanamVideo ? (
                              <video
                                src={mediaConfig.heroTindivanamVideo}
                                poster={mediaConfig.heroTindivanamPoster}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-white/30 text-xs">
                                No video
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                                Video MP4 URL:
                              </label>
                              <input
                                type="text"
                                value={mediaConfig.heroTindivanamVideo}
                                onChange={(e) =>
                                  setMediaConfig({
                                    ...mediaConfig,
                                    heroTindivanamVideo: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-black/50 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                                Poster Image URL:
                              </label>
                              <input
                                type="text"
                                value={mediaConfig.heroTindivanamPoster}
                                onChange={(e) =>
                                  setMediaConfig({
                                    ...mediaConfig,
                                    heroTindivanamPoster: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-black/50 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="cursor-pointer inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold hover:underline mt-1">
                                <Upload className="h-3 w-3" />
                                <span>Upload Poster File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload("heroTindivanamPoster", e)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Chennai Flagship Slide */}
                        <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 space-y-3">
                          <div className="flex items-center justify-between text-xs font-semibold text-gold">
                            <span>3. Chennai Flagship</span>
                            <span className="text-[10px] text-white/40 uppercase">Slide 3</span>
                          </div>

                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-white/10">
                            {mediaConfig.heroChennaiVideo ? (
                              <video
                                src={mediaConfig.heroChennaiVideo}
                                poster={mediaConfig.heroChennaiPoster}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-white/30 text-xs">
                                No video
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                                Video MP4 URL:
                              </label>
                              <input
                                type="text"
                                value={mediaConfig.heroChennaiVideo}
                                onChange={(e) =>
                                  setMediaConfig({
                                    ...mediaConfig,
                                    heroChennaiVideo: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-black/50 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                                Poster Image URL:
                              </label>
                              <input
                                type="text"
                                value={mediaConfig.heroChennaiPoster}
                                onChange={(e) =>
                                  setMediaConfig({
                                    ...mediaConfig,
                                    heroChennaiPoster: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-black/50 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="cursor-pointer inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold hover:underline mt-1">
                                <Upload className="h-3 w-3" />
                                <span>Upload Poster File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload("heroChennaiPoster", e)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Inner Page Hero Banner Media (About, Contact, Rooms, etc.) */}
                    <div className="space-y-4">
                      <div className="border-b border-white/10 pb-2">
                        <h4 className="font-display text-sm font-semibold text-warm-white tracking-wider uppercase flex items-center gap-2">
                          <Building className="h-4 w-4 text-gold" />
                          <span>Inner Page Hero Banner (About, Contact, Facilities)</span>
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 space-y-3">
                          <span className="text-xs font-semibold text-gold block">
                            Top Video Background URL
                          </span>
                          <input
                            type="text"
                            value={mediaConfig.pageHeroVideo}
                            onChange={(e) =>
                              setMediaConfig({
                                ...mediaConfig,
                                pageHeroVideo: e.target.value,
                              })
                            }
                            className="w-full rounded-lg bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-gold">
                              Fallback Cover Photography
                            </span>
                            <label className="cursor-pointer text-[10px] text-gold uppercase hover:underline">
                              Upload File
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload("pageHeroImage", e)
                                }
                              />
                            </label>
                          </div>
                          <input
                            type="text"
                            value={mediaConfig.pageHeroImage}
                            onChange={(e) =>
                              setMediaConfig({
                                ...mediaConfig,
                                pageHeroImage: e.target.value,
                              })
                            }
                            className="w-full rounded-lg bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Rooms & Suites Photography */}
                    <div className="space-y-4">
                      <div className="border-b border-white/10 pb-2">
                        <h4 className="font-display text-sm font-semibold text-warm-white tracking-wider uppercase flex items-center gap-2">
                          <BedDouble className="h-4 w-4 text-gold" />
                          <span>Rooms &amp; Suites Photography</span>
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { key: "roomNormal" as const, label: "Standard AC Room", desc: "Economy / Solo" },
                          { key: "roomDeluxe" as const, label: "Deluxe Luxury AC", desc: "Best Seller" },
                          { key: "roomChettinad" as const, label: "Heritage Chettinad", desc: "Teak & Palace" },
                          { key: "roomPenthouse" as const, label: "Royal Penthouse", desc: "1,200 sq. ft." },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="rounded-2xl border border-white/10 bg-[#160f0b] p-3 space-y-2.5"
                          >
                            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-black/40 border border-white/10">
                              <Image
                                src={mediaConfig[item.key]}
                                alt={item.label}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-xs">
                              <span className="font-bold text-warm-white block">{item.label}</span>
                              <span className="text-[10px] text-white/50">{item.desc}</span>
                            </div>
                            <input
                              type="text"
                              value={mediaConfig[item.key]}
                              onChange={(e) =>
                                setMediaConfig({
                                  ...mediaConfig,
                                  [item.key]: e.target.value,
                                })
                              }
                              className="w-full rounded-lg bg-black/50 border border-white/15 px-2 py-1.5 text-[11px] text-white"
                            />
                            <label className="cursor-pointer inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold hover:underline">
                              <Upload className="h-3 w-3" />
                              <span>Replace Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(item.key, e)}
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB 3: EXECUTIVE ANALYTICS                                */}
                {/* ========================================================= */}
                {activeTab === "analytics" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-base font-bold text-warm-white tracking-wider uppercase">
                          Executive Performance &amp; Revenue Metrics
                        </h3>
                        <p className="text-xs text-white/50 mt-0.5">
                          Cross-branch booking volume, guest stay durations, and revenue distribution.
                        </p>
                      </div>
                      <span className="rounded-full bg-gold/15 border border-gold/40 px-3 py-1 text-xs text-gold font-mono font-bold">
                        FY 2026-27 Active
                      </span>
                    </div>

                    {/* Branch Revenue Breakdown Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                            Puducherry Residency
                          </span>
                          <MapPin className="h-4 w-4 text-gold/60" />
                        </div>
                        <div className="text-2xl font-bold font-mono text-warm-white">
                          ₹{metrics.puduRevenue.toLocaleString("en-IN")}
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-gold to-[#c79a4d] h-full"
                            style={{
                              width: `${metrics.totalRevenue ? (metrics.puduRevenue / metrics.totalRevenue) * 100 : 33}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-white/50 block">
                          Beachfront &amp; Heritage Tourism Segment
                        </span>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                            Tindivanam Restaurant
                          </span>
                          <MapPin className="h-4 w-4 text-gold/60" />
                        </div>
                        <div className="text-2xl font-bold font-mono text-warm-white">
                          ₹{metrics.tindiRevenue.toLocaleString("en-IN")}
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full"
                            style={{
                              width: `${metrics.totalRevenue ? (metrics.tindiRevenue / metrics.totalRevenue) * 100 : 33}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-white/50 block">
                          Highway Transit &amp; Chettinad Dining
                        </span>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                            Chennai Flagship
                          </span>
                          <MapPin className="h-4 w-4 text-gold/60" />
                        </div>
                        <div className="text-2xl font-bold font-mono text-warm-white">
                          ₹{metrics.chennaiRevenue.toLocaleString("en-IN")}
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full"
                            style={{
                              width: `${metrics.totalRevenue ? (metrics.chennaiRevenue / metrics.totalRevenue) * 100 : 33}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-white/50 block">
                          Metropolitan Business &amp; Luxury Stays
                        </span>
                      </div>
                    </div>

                    {/* Operational Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-5 space-y-3">
                        <h4 className="text-xs uppercase tracking-wider text-gold font-semibold">
                          Room Type Popularity
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-white/80">Deluxe Luxury AC Room (₹4,499)</span>
                            <span className="font-mono text-gold font-bold">42% Share</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-white/80">Heritage Chettinad Teak Suite (₹6,499)</span>
                            <span className="font-mono text-gold font-bold">28% Share</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-white/80">Standard Normal AC Room (₹2,999)</span>
                            <span className="font-mono text-gold font-bold">18% Share</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-white/80">Royal Penthouse Suite (₹8,999)</span>
                            <span className="font-mono text-gold font-bold">12% Share</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#160f0b] p-5 space-y-3">
                        <h4 className="text-xs uppercase tracking-wider text-gold font-semibold">
                          Key Performance Indicators (KPI)
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-white/80">Average Daily Rate (ADR)</span>
                            <span className="font-mono text-emerald-400 font-bold">₹5,490</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-white/80">Average Length of Stay</span>
                            <span className="font-mono text-warm-white font-bold">2.6 Nights</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-white/5">
                            <span className="text-white/80">Direct Online / WhatsApp Share</span>
                            <span className="font-mono text-gold font-bold">89.4%</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-white/80">Guest Repeat Satisfaction</span>
                            <span className="font-mono text-emerald-400 font-bold">4.9 / 5.0 ⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB 4: ROOM INVENTORY & RATES                             */}
                {/* ========================================================= */}
                {activeTab === "inventory" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-base font-bold text-warm-white tracking-wider uppercase">
                          Room Tiers, Rates &amp; Inventory Allocation
                        </h3>
                        <p className="text-xs text-white/50 mt-0.5">
                          Standard pricing, capacity, and air conditioning configurations per tier.
                        </p>
                      </div>
                      <span className="text-xs text-gold font-semibold">
                        4 Verified Active Room Classes
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Standard Normal AC Room",
                          rate: "₹2,999",
                          sqft: "320 sq. ft.",
                          beds: "Queen Plush Bed",
                          ac: "100% Split Inverter AC",
                          capacity: "2 Guests",
                          status: "Available",
                        },
                        {
                          title: "Deluxe Luxury AC Room",
                          rate: "₹4,499",
                          sqft: "450 sq. ft.",
                          beds: "King Luxury Orthopedic Bed",
                          ac: "Whisper-Quiet Daikin Inverter AC",
                          capacity: "2 Adults + 1 Child",
                          status: "Available",
                        },
                        {
                          title: "Heritage Chettinad Teak Suite",
                          rate: "₹6,499",
                          sqft: "750 sq. ft.",
                          beds: "Four-Poster Teak King Bed",
                          ac: "Dual Split Inverter Climate AC",
                          capacity: "3 Guests",
                          status: "Available",
                        },
                        {
                          title: "Royal Penthouse & Family Suite",
                          rate: "₹8,999",
                          sqft: "1,200 sq. ft.",
                          beds: "Grand King + Twin Bedroom",
                          ac: "Dual-Zone Central AC",
                          capacity: "4 to 6 Guests",
                          status: "Available",
                        },
                      ].map((room, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-white/10 bg-[#160f0b] p-5 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-warm-white">
                              {room.title}
                            </span>
                            <span className="font-mono text-base font-bold text-gold">
                              {room.rate} <span className="text-xs font-normal text-white/50">/ night</span>
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-white/70 py-2 border-y border-white/5">
                            <div>📐 Size: <span className="text-white font-medium">{room.sqft}</span></div>
                            <div>🛏️ Bed: <span className="text-white font-medium">{room.beds}</span></div>
                            <div>❄️ AC: <span className="text-white font-medium">{room.ac}</span></div>
                            <div>👥 Max: <span className="text-white font-medium">{room.capacity}</span></div>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {room.status} for Booking
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setIsOpen(false);
                                if (typeof window !== "undefined") {
                                  window.dispatchEvent(
                                    new CustomEvent("open-direct-booking", {
                                      detail: { title: room.title, rate: room.rate },
                                    })
                                  );
                                }
                              }}
                              className="text-xs text-gold hover:underline cursor-pointer"
                            >
                              Test Booking Form →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Information Bar */}
              <div className="border-t border-white/10 bg-[#120c09] px-6 py-3 flex flex-wrap items-center justify-between text-xs text-white/50">
                <div className="flex items-center gap-3">
                  <span>Luxury Hotel Master OS v2.4</span>
                  <span>•</span>
                  <span>Direct Guest WhatsApp Concierge Sync Enabled</span>
                </div>
                <div className="flex items-center gap-2 text-gold">
                  <span>Toggle Shortcut:</span>
                  <kbd className="rounded border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-mono font-bold text-gold">
                    Ctrl + M
                  </kbd>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* ORDER INSPECTION FOLIO MODAL / DRAWER                    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative w-full max-w-2xl rounded-3xl border border-gold/50 bg-[#160f0b] text-warm-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold hover:text-[#1a120b] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Folio Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                    Guest Reservation Folio
                  </span>
                  <span className="font-mono text-sm font-bold text-gold">
                    {selectedOrder.id}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-warm-white mt-1">
                  {selectedOrder.guestName}
                </h3>
                <p className="text-xs text-white/50">
                  Booked on {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                </p>
              </div>

              {/* Guest & Room Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl bg-white/5 p-3.5 space-y-1.5 border border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Guest Contact</span>
                  <div className="font-semibold text-white">{selectedOrder.guestName}</div>
                  <div className="text-white/80">{selectedOrder.phone}</div>
                  <div className="text-white/60">{selectedOrder.email}</div>
                </div>

                <div className="rounded-xl bg-white/5 p-3.5 space-y-1.5 border border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Assigned Sanctuary</span>
                  <div className="font-semibold text-gold">{selectedOrder.roomType}</div>
                  <div className="text-white/80">{selectedOrder.branchName}</div>
                  <div className="text-white/60">{selectedOrder.guests}</div>
                </div>
              </div>

              {/* Stay Duration & Billing Breakdown */}
              <div className="rounded-2xl border border-white/10 bg-[#120c09] p-4 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
                  Stay &amp; Invoice Summary
                </span>
                <div className="space-y-2 text-xs divide-y divide-white/5">
                  <div className="flex justify-between py-1">
                    <span className="text-white/70">Check-in:</span>
                    <span className="font-medium text-white">{selectedOrder.checkIn}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/70">Check-out:</span>
                    <span className="font-medium text-white">{selectedOrder.checkOut}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/70">Duration:</span>
                    <span className="font-medium text-white">{selectedOrder.nights} Nights</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/70">Room Rate:</span>
                    <span className="font-mono text-white">{selectedOrder.rate} / night</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm font-bold">
                    <span className="text-gold">Total Amount Due:</span>
                    <span className="font-mono text-gold text-base">
                      ₹{selectedOrder.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedOrder.specialRequest && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 text-xs text-amber-200">
                  <span className="font-semibold uppercase tracking-wider block mb-1">Guest Special Request:</span>
                  <p>{selectedOrder.specialRequest}</p>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/50 block font-semibold">
                  Update Reservation Status:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["Confirmed", "Checked In", "Checked Out", "Cancelled"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`rounded-xl py-2 px-3 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                        selectedOrder.status === st
                          ? "bg-gold text-[#1a120b] shadow-md font-bold"
                          : "border border-white/20 bg-white/5 text-white/70 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const msg = `Hello ${selectedOrder.guestName}, this is Luxury Hotel confirming your stay for ${selectedOrder.roomType} [Ref: ${selectedOrder.id}]. We look forward to hosting you.`;
                    window.open(`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:brightness-105 transition-all shadow-md cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  <span>WhatsApp Guest</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MANUAL NEW RESERVATION MODAL                             */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setIsAddOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative w-full max-w-lg rounded-3xl border border-gold/50 bg-[#160f0b] text-warm-white p-6 sm:p-8 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display text-lg font-bold text-gold uppercase tracking-wider">
                  Create Walk-in / Phone Order
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold hover:text-[#1a120b]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateReservation} className="space-y-4 text-xs">
                <div>
                  <label className="block text-white/60 uppercase tracking-wider mb-1">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="e.g. Ramesh Krishnan"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="+91 98400 12345"
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="guest@gmail.com"
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 uppercase tracking-wider mb-1">
                      Branch
                    </label>
                    <select
                      value={newBranch}
                      onChange={(e) => setNewBranch(e.target.value)}
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                    >
                      <option value="puducherry">Puducherry Residency</option>
                      <option value="tindivanam">Tindivanam Restaurant</option>
                      <option value="chennai">Chennai Flagship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase tracking-wider mb-1">
                      Room Type
                    </label>
                    <select
                      value={newRoomType}
                      onChange={(e) => {
                        setNewRoomType(e.target.value);
                        if (e.target.value.includes("Normal")) setNewRate("2999");
                        else if (e.target.value.includes("Deluxe")) setNewRate("4499");
                        else if (e.target.value.includes("Chettinad")) setNewRate("6499");
                        else if (e.target.value.includes("Penthouse")) setNewRate("8999");
                      }}
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                    >
                      <option value="Standard Normal AC Room">Standard Normal AC (₹2,999)</option>
                      <option value="Deluxe Luxury AC Room">Deluxe Luxury AC (₹4,499)</option>
                      <option value="Heritage Chettinad Teak Suite">Heritage Chettinad (₹6,499)</option>
                      <option value="Royal Penthouse & Family Suite">Royal Penthouse (₹8,999)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-white/60 uppercase tracking-wider mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={newCheckIn}
                      onChange={(e) => setNewCheckIn(e.target.value)}
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 uppercase tracking-wider mb-1">
                      Nights
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={newNights}
                      onChange={(e) => setNewNights(e.target.value)}
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 uppercase tracking-wider mb-1">
                      Guests
                    </label>
                    <input
                      type="text"
                      value={newGuests}
                      onChange={(e) => setNewGuests(e.target.value)}
                      placeholder="2 Guests"
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 uppercase tracking-wider mb-1">
                    Special Requests / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g. Late check-in, ground floor preferred..."
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="rounded-xl border border-white/20 px-4 py-2 text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-gold to-[#c79a4d] px-5 py-2 font-bold uppercase tracking-wider text-[#1a120b]"
                  >
                    Confirm &amp; Register Order
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

