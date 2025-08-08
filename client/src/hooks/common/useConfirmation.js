// myPortfolio/client/src/hooks/common/useConfirmation.js
import { useState, useCallback } from 'react';

/**
 * Crea el estado inicial para el modal de confirmación
 *
 * @returns {object} - Estado inicial del modal de confirmación
 */
const createInitialState = () => ({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
});

/**
 * Crea las funciones auxiliares para el modal de confirmación
 *
 * @param {object} confirmationState - Estado actual del modal de confirmación
 * @param {Function} setConfirmationState - Función para actualizar el estado del modal de confirmación
 * @returns {object} Objeto que contiene las acciones de confirmación (openConfirmation, closeConfirmation, confirmAction)
 */
const useConfirmationActions = (confirmationState, setConfirmationState) => {
    const closeConfirmation = useCallback(() => {
        setConfirmationState((prev) => ({
            ...prev,
            isOpen: false,
        }));
    }, [setConfirmationState]);
    const openConfirmation = useCallback(
        (options) => {
            setConfirmationState({
                isOpen: true,
                title: options.title || 'Confirmar acción',
                message: options.message || '¿Estás seguro?',
                onConfirm: options.onConfirm,
                confirmText: options.confirmText || 'Confirmar',
                cancelText: options.cancelText || 'Cancelar',
            });
        },
        [setConfirmationState],
    );
    const confirmAction = useCallback(() => {
        if (confirmationState.onConfirm) {
            confirmationState.onConfirm();
        }
        closeConfirmation();
    }, [confirmationState, closeConfirmation]);
    return { openConfirmation, closeConfirmation, confirmAction };
};

/**
 * Hook para manejar la lógica de confirmación
 *
 * @returns {object} - Hook que maneja el estado del modal de confirmación
 */
export const useConfirmation = () => {
    const [confirmationState, setConfirmationState] = useState(createInitialState());
    const { openConfirmation, closeConfirmation, confirmAction } = useConfirmationActions(
        confirmationState,
        setConfirmationState,
    );
    return {
        confirmationState,
        openConfirmation,
        closeConfirmation,
        confirmAction,
    };
};
