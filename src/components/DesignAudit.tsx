import React, { useState } from 'react';
import { Upload, Sparkles, X, AlertCircle } from 'lucide-react';
import { auditDesign } from '../services/designAudit/designAuditService';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useApiKey } from '../context/ApiKeyContext';
import { ApiError } from '../services/api/error';

export function DesignAudit() {
  const { apiKey } = useApiKey();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("La taille de l'image ne doit pas dépasser 5MB");
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setAuditResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("La taille de l'image ne doit pas dépasser 5MB");
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setAuditResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
    setAuditResult(null);
  };

  const handleAudit = async () => {
    if (!selectedImage || !apiKey) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await auditDesign(selectedImage);
      setAuditResult(result);
    } catch (err) {
      console.error('Error auditing design:', err);
      if (err instanceof ApiError && err.status === 429) {
        setError('Trop de requêtes. Veuillez patienter quelques secondes avant de réessayer.');
      } else {
        setError('Une erreur inattendue est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="glass-effect rounded-2xl p-4 sm:p-6">
        <div className="flex items-start gap-2 text-red-400">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">Veuillez configurer votre clé API OpenRouter pour utiliser cette fonctionnalité. Cliquez sur l'icône de clé à droite pour la configurer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-medium gradient-text mb-4">
        Audit de Design
      </h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative border-2 border-dashed border-gray-600 rounded-xl p-6 sm:p-8 text-center hover:border-blue-500 transition-colors"
      >
        {!imagePreview ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-4">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto rounded-full bg-blue-600/10 flex items-center justify-center">
                <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-300">
                  Glissez-déposez votre design ici ou cliquez pour sélectionner
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  PNG, JPG jusqu'à 5MB
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full mx-auto rounded-lg"
              style={{ maxHeight: '70vh' }}
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p>{error}</p>
              <p className="mt-1 text-xs sm:text-sm text-red-400/80">
                Si l'analyse échoue, veuillez réessayer. L'IA peut parfois avoir besoin de plusieurs tentatives pour analyser correctement une image.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAudit}
            disabled={isAnalyzing || !apiKey}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-xl transition-all duration-200 ${
              isAnalyzing || !apiKey
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 glow-blue-sm hover:glow-blue'
            }`}
          >
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            {isAnalyzing ? 'Analyse...' : 'Auditer le design'}
          </button>
        </div>
      )}

      {auditResult && (
        <div className="mt-6">
          <div className="p-3 sm:p-4 bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl">
            <MarkdownRenderer content={auditResult} />
          </div>
        </div>
      )}
    </div>
  );
}