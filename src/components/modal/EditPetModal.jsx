import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '@/app/dashboard/DashboardForm.css'; 

export default function EditPetModal({ isOpen, formData, isSaving, onClose, onChange, onSubmit }) {
  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-[#D4A574]/30 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[#D4A574]/20 bg-[#FFF8F0] shrink-0">
          <h2 className="text-2xl font-bold text-[#4A2C17]">
            Edit <span className="text-[#E8742A]">{formData.petName}</span>
          </h2>
          <button 
            onClick={onClose}
            className="text-[#8B5E3C] hover:text-[#E8742A] bg-white rounded-full p-2 shadow-sm transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="editPetForm" onSubmit={onSubmit} className="paw-dashboard__form-grid">
            
            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Pet Name *</label>
              <input 
                type="text" 
                name="petName" 
                className="paw-dashboard__form-input" 
                value={formData.petName || ''}
                onChange={onChange}
                required
              />
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Species *</label>
              <select 
                name="species" 
                className="paw-dashboard__form-select"
                value={formData.species || ''}
                onChange={onChange}
                required
              >
                <option value="" disabled>Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Breed</label>
              <input 
                type="text" 
                name="breed" 
                className="paw-dashboard__form-input" 
                value={formData.breed || ''}
                onChange={onChange}
              />
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Age (Years) *</label>
              <input 
                type="number" 
                name="age" 
                step="0.1"
                min="0"
                className="paw-dashboard__form-input" 
                value={formData.age || ''}
                onChange={onChange}
                required
              />
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Gender *</label>
              <select 
                name="gender" 
                className="paw-dashboard__form-select"
                value={formData.gender || ''}
                onChange={onChange}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Image URL *</label>
              <input 
                type="url" 
                name="imageUrl" 
                className="paw-dashboard__form-input" 
                value={formData.imageUrl || ''}
                onChange={onChange}
                required
              />
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Health Status</label>
              <select 
                name="healthStatus" 
                className="paw-dashboard__form-select"
                value={formData.healthStatus || ''}
                onChange={onChange}
              >
                <option value="" disabled>Select Status</option>
                <option value="Healthy">Healthy</option>
                <option value="Special Needs">Special Needs</option>
                <option value="Recovering">Recovering</option>
              </select>
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Vaccination Status</label>
              <select 
                name="vaccinationStatus" 
                className="paw-dashboard__form-select"
                value={formData.vaccinationStatus || ''}
                onChange={onChange}
              >
                <option value="" disabled>Select Status</option>
                <option value="Fully Vaccinated">Fully Vaccinated</option>
                <option value="Partially Vaccinated">Partially Vaccinated</option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </select>
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Location *</label>
              <input 
                type="text" 
                name="location" 
                className="paw-dashboard__form-input" 
                value={formData.location || ''}
                onChange={onChange}
                required
              />
            </div>

            <div className="paw-dashboard__form-group">
              <label className="paw-dashboard__form-label">Adoption Fee ($)</label>
              <input 
                type="number" 
                name="adoptionFee" 
                min="0"
                className="paw-dashboard__form-input" 
                value={formData.adoptionFee || ''}
                onChange={onChange}
              />
            </div>

            <div className="paw-dashboard__form-group paw-dashboard__form-group--full">
              <label className="paw-dashboard__form-label">Description *</label>
              <textarea 
                name="description" 
                className="paw-dashboard__form-textarea" 
                value={formData.description || ''}
                onChange={onChange}
                required
              />
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t border-[#D4A574]/20 bg-gray-50 flex justify-end gap-4 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="editPetForm"
            disabled={isSaving}
            className="px-8 py-2.5 bg-gradient-to-r from-[#E8742A] to-[#F5923E] hover:from-[#d66520] hover:to-[#e07d2c] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(232,116,42,0.3)] hover:shadow-[0_6px_20px_rgba(232,116,42,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
