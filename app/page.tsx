'use client';

import { useState } from 'react';
import { Send, Loader2, FileText, Sparkles, ArrowRight, CheckCircle2, Copy, RefreshCw } from 'lucide-react';

export default function BlogGenerator() {
  const [step, setStep] = useState<number>(1);
  const [blogText, setBlogText] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleTextSubmit = () => {
    if (blogText.trim()) {
      setStep(2);
      setError('');
    }
  };

  const handleFormatSelect = async (format: string) => {
    setSelectedFormat(format);
    setStep(3);
    setError('');

    try {
      const webhookUrl = 'https://n8n.srv992398.hstgr.cloud/webhook-test/88a6d67d-c831-460c-8dd3-404bfbe1b846';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogText: blogText,
          format: format,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.response || data.result || data.message || JSON.stringify(data, null, 2));
      setStep(4);
    } catch (err) {
      setError('Failed to generate blog. Please try again.');
      console.error('Error:', err);
      setStep(2);
    }
  };

  const handleReset = () => {
    setStep(1);
    setBlogText('');
    setSelectedFormat('');
    setResult('');
    setError('');
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Step 1: Blog Text Input
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <img src="https://i.ibb.co/QjYWQwQ2/Logomark-White.png" height="40" width="40" alt="Riva"/>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Summarizer </h1>
            <p className="text-lg text-gray-600">Transform your ideas into engaging blog posts</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Enter Your Blog Content
            </label>
            <textarea
              value={blogText}
              onChange={(e) => setBlogText(e.target.value)}
              placeholder="Write your blog content here... Share your thoughts, ideas, or story that you want to transform into a professional blog post."
              rows={12}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 placeholder-gray-400"
            />

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {blogText.length} characters
              </p>
              <button
                onClick={handleTextSubmit}
                disabled={!blogText.trim()}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Format Selection
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Format</h1>
            <p className="text-lg text-gray-600">Select how you want your blog to be formatted</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Reddit Format */}
            <button
              onClick={() => handleFormatSelect('reddit')}
              className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 hover:border-orange-500 hover:shadow-2xl transition-all group text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <svg className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Reddit Style</h3>
                  <p className="text-sm text-gray-500">Casual & Conversational</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Perfect for community discussions with a casual tone, engaging storytelling, and relatable content that resonates with readers.
              </p>
              <div className="mt-6 flex items-center text-orange-600 font-semibold group-hover:gap-3 transition-all">
                Select Format
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Medium Format */}
            <button
              onClick={() => handleFormatSelect('medium')}
              className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 hover:border-green-500 hover:shadow-2xl transition-all group text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <svg className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">Medium Article</h3>
                  <p className="text-sm text-gray-500">Professional & Polished</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Ideal for thought leadership pieces with a professional tone, well-structured arguments, and insightful analysis.
              </p>
              <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:gap-3 transition-all">
                Select Format
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setStep(1)}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Loading
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full opacity-20 animate-ping"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Creating Your Blog</h2>
          <p className="text-lg text-gray-600 mb-2">Our AI is crafting your perfect {selectedFormat === 'reddit' ? 'Reddit post' : 'Medium article'}</p>
          <p className="text-sm text-gray-500">This may take a few moments...</p>

          <div className="mt-8 flex justify-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Result
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Blog is Ready!</h1>
            <p className="text-lg text-gray-600">
              Generated as {selectedFormat === 'reddit' ? 'Reddit Style' : 'Medium Article'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">Generated Content</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 hover:bg-gray-100 rounded-lg transition-all font-medium shadow-md"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                  {result}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
            >
              <RefreshCw className="w-5 h-5" />
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}