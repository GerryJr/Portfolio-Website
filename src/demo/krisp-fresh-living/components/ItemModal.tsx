import { useState, useEffect } from 'react';
import type { MenuItem } from '../lib/menu-data';
import { formatPrice } from '../lib/menu-data';
import { useCart } from './CartProvider';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const { addItem } = useCart();

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setShowInstructions(false);
      setInstructions('');
      setSelectedModifiers({});
    }
  }, [item]);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!item) return null;

  const handleModifierToggle = (groupGuid: string, optionGuid: string, maxSelections: number) => {
    setSelectedModifiers(prev => {
      const current = prev[groupGuid] || [];
      if (current.includes(optionGuid)) {
        return { ...prev, [groupGuid]: current.filter(id => id !== optionGuid) };
      }
      if (maxSelections === 1) {
        return { ...prev, [groupGuid]: [optionGuid] };
      }
      if (current.length >= maxSelections) {
        return prev;
      }
      return { ...prev, [groupGuid]: [...current, optionGuid] };
    });
  };

  // Check if all required modifier groups have selections
  const requiredMet = item.modifierGroups
    .filter((g: any) => g.required)
    .every((g: any) => {
      const sel = selectedModifiers[g.guid] || [];
      return sel.length >= g.minSelections;
    });

  // Calculate total price including modifiers
  const basePrice = item.prices[0] || 0;
  let modifierPrice = 0;
  item.modifierGroups.forEach((group: any) => {
    const sel = selectedModifiers[group.guid] || [];
    group.options.forEach((opt: any) => {
      if (sel.includes(opt.guid)) {
        modifierPrice += opt.price;
      }
    });
  });
  const unitPrice = basePrice + modifierPrice;

  const handleAdd = () => {
    addItem({
      guid: item.guid,
      name: item.name,
      price: unitPrice,
      imageUrl: item.imageUrl,
      quantity,
      specialInstructions: instructions,
      selectedModifiers,
    });
    onClose();
  };

  return (
    <div className="krisp-modal-backdrop" onClick={onClose}>
      <div className="krisp-modal-modal" onClick={e => e.stopPropagation()}>
        <button className="krisp-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {item.imageUrl && (
          <div className="krisp-modal-imageWrapper">
            <img src={item.imageUrl} alt={item.name} className="krisp-modal-image" loading="lazy" />
          </div>
        )}

        <div className="krisp-modal-body">
          <h3 className="krisp-modal-name">{item.name}</h3>
          <p className="krisp-modal-price">{formatPrice(item.prices)}</p>
          <p className="krisp-modal-description">{item.description}</p>

          {/* Modifier groups */}
          {item.modifierGroups.map((group: any) => (
            <div key={group.guid} className="krisp-modal-modSection">
              <h4 className="krisp-modal-modTitle">
                {group.name}
                {group.required && <span className="krisp-modal-required"> *Required</span>}
                {group.maxSelections > 1 && (
                  <span className="krisp-modal-modHint"> (Choose up to {group.maxSelections})</span>
                )}
              </h4>
              <div className="krisp-modal-modGrid">
                {group.options.map((opt: any) => {
                  const isSelected = (selectedModifiers[group.guid] || []).includes(opt.guid);
                  return (
                    <button
                      key={opt.guid}
                      className={`krisp-modal-modChip${isSelected ? ' krisp-modal-modActive' : ''}`}
                      onClick={() => handleModifierToggle(group.guid, opt.guid, group.maxSelections)}
                    >
                      {opt.name}
                      {opt.price > 0 && (
                        <span className="krisp-modal-modPrice"> +${opt.price.toFixed(2)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special instructions */}
          <div className="krisp-modal-instructionsSection">
            <button
              className="krisp-modal-instructionsToggle"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <span className="krisp-modal-instructionsLabel">
                {showInstructions ? 'Hide' : 'Add'} special instructions
              </span>
            </button>
            {showInstructions && (
              <>
                <textarea
                  className="krisp-modal-instructionsInput"
                  rows={2}
                  maxLength={200}
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="Any allergies or requests?"
                />
                <span className="krisp-modal-instructionsCount">
                  {instructions.length}/200
                </span>
              </>
            )}
          </div>

          {/* Quantity controls */}
          <div className="krisp-modal-qtySection">
            <span className="krisp-modal-qtyLabel">Quantity</span>
            <div className="krisp-modal-qtyControls">
              <button
                className="krisp-modal-qtyBtn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease"
              >
                &minus;
              </button>
              <span className="krisp-modal-qtyValue">{quantity}</span>
              <button
                className="krisp-modal-qtyBtn"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to order button */}
          <button
            className={`krisp-modal-addBtn${!requiredMet ? ' krisp-modal-addBtnDisabled' : ''}`}
            onClick={handleAdd}
            disabled={!requiredMet}
          >
            Add to Order &mdash; {formatPrice([unitPrice * quantity])}
          </button>
        </div>
      </div>
    </div>
  );
}
