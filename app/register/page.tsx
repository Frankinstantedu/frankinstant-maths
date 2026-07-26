'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ParentRegistrationPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      parentName: formData.get('parentName'),
      parentEmail: formData.get('parentEmail'),
      parentPhone: formData.get('parentPhone'),
      childName: formData.get('childName'),
      childAge: formData.get('childAge'),
      childClass: formData.get('childClass'),
      notes: formData.get('notes'),
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit registration.');
      }

      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Parent & Child Registration 📝
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Please fill out the form below to register. Details will be sent directly to our administration team.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
              <h3 className="text-lg font-bold text-emerald-800">Registration Successful! 🎉</h3>
              <p className="text-sm text-emerald-700">
                Thank you for registering. We have received your details and will get in touch with you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-all"
              >
                Register Another Child
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Parent / Guardian Information</h2>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Parent's Full Name
                  </label>
                  <input
                    required
                    name="parentName"
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 text-slate-800 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      name="parentEmail"
                      type="email"
                      placeholder="sarah@example.com"
                      className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 text-slate-800 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      required
                      name="parentPhone"
                      type="tel"
                      placeholder="+44 7123 456789"
                      className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 text-slate-800 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Child Information</h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Child's Full Name
                  </label>
                  <input
                    required
                    name="childName"
                    type="text"
                    placeholder="e.g. Leo Jenkins"
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 text-slate-800 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Child's Age
                    </label>
                    <input
                      required
                      name="childAge"
                      type="number"
                      placeholder="e.g. 9"
                      className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 text-slate-800 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Child's Class / Year
                    </label>
                    <input
                      required
                      name="childClass"
                      type="text"
                      placeholder="e.g. Year 4"
                      className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 text-slate-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Additional Notes or Requirements (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Any specific learning focuses or health notes..."
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 text-slate-800 text-sm"
                  ></textarea>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm text-center">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-md shadow-indigo-200 disabled:bg-indigo-300"
              >
                {status === 'submitting' ? 'Submitting Registration...' : 'Complete Registration 🚀'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}