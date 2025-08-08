// myPortfolio/client/src/hooks/projects/useProjectFormState.js
import { useState, useCallback } from 'react';

/**
 * Estado inicial del formulario
 *
 * @returns {object} El objeto con los datos iniciales del formulario
 */
export const getInitialFormData = () => ({
    title: '',
    shortDescription: '',
    longDescription: '',
    technologies: '',
    liveDemoUrl: '',
    githubUrl: '',
    imageUrl: '',
    isFeatured: false,
});

/**
 * Función para transformar datos del proyecto para el formulario
 *
 * @param {object} projectData - Los datos del proyecto a transformar
 * @returns {object} Los datos del proyecto transformados para el formulario
 */
export const transformProjectDataForForm = (projectData) => {
    return {
        title: projectData.title || '',
        shortDescription: projectData.shortDescription || '',
        longDescription: projectData.longDescription || '',
        technologies: Array.isArray(projectData.technologies)
            ? projectData.technologies
                  .map((tech) => {
                      if (tech && typeof tech === 'object') {
                          return tech.name || '';
                      }
                      return tech || '';
                  })
                  .filter(Boolean)
                  .join(', ')
            : projectData.technologies || '',
        liveDemoUrl: projectData.liveDemoUrl || '',
        githubUrl: projectData.githubUrl || '',
        imageUrl: projectData.imageUrl || '',
        isFeatured: projectData.isFeatured || false,
    };
};

/**
 * Función para transformar datos del formulario para envío
 *
 * @param {object} formData - Los datos del formulario a transformar
 * @returns {object} Los datos del formulario transformados para envío
 */
export const transformFormDataForSubmission = (formData) => {
    return {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim(),
        longDescription: formData.longDescription.trim(),
        technologies: formData.technologies
            .split(',')
            .map((tech) => tech.trim())
            .filter(Boolean),
        liveDemoUrl: formData.liveDemoUrl.trim(),
        githubUrl: formData.githubUrl.trim(),
        imageUrl: formData.imageUrl.trim(),
        isFeatured: formData.isFeatured,
    };
};

/**
 * Crear función para actualizar un campo individual
 *
 * @param {Function} setFormData - La función para actualizar el estado del formulario
 * @returns {Function} Una función que actualiza un campo específico del formulario
 */
const useCreateUpdateField = (setFormData) =>
    useCallback(
        (fieldName, value) => {
            setFormData((prev) => ({
                ...prev,
                [fieldName]: value,
            }));
        },
        [setFormData],
    );

/**
 * Crear función para actualizar múltiples campos
 *
 * @param {Function} setFormData - La función para actualizar el estado del formulario
 * @returns {Function} Una función que actualiza múltiples campos del formulario
 */
const useCreateUpdateFields = (setFormData) =>
    useCallback(
        (updates) => {
            setFormData((prev) => ({
                ...prev,
                ...updates,
            }));
        },
        [setFormData],
    );

/**
 * Crear función para resetear el formulario
 *
 * @param {Function} setFormData - La función para actualizar el estado del formulario
 * @returns {Function} Una función que resetea el formulario a su estado inicial
 */
const useCreateResetForm = (setFormData) =>
    useCallback(() => {
        setFormData(getInitialFormData());
    }, [setFormData]);

/**
 * Crear función para cargar datos del proyecto
 *
 * @param {Function} setFormData - La función para actualizar el estado del formulario
 * @returns {Function} Una función que carga datos del proyecto en el formulario
 */
const useCreateLoadProjectData = (setFormData) =>
    useCallback(
        (projectData) => {
            const transformedData = transformProjectDataForForm(projectData);
            setFormData(transformedData);
        },
        [setFormData],
    );

/**
 * Crear función para obtener datos de envío
 *
 * @param {object} formData - El estado actual del formulario
 * @returns {Function} Una función que retorna los datos transformados para envío
 */
const useCreateGetSubmissionData = (formData) =>
    useCallback(() => {
        return transformFormDataForSubmission(formData);
    }, [formData]);

/**
 * Hook personalizado para crear las funciones de manipulación del formulario
 *
 * @param {Function} setFormData - La función para actualizar el estado del formulario
 * @param {object} formData - El estado actual del formulario
 * @returns {object} Un objeto con las funciones de manipulación del formulario
 */
const useFormActions = (setFormData, formData) => {
    return {
        updateField: useCreateUpdateField(setFormData),
        updateFields: useCreateUpdateFields(setFormData),
        resetForm: useCreateResetForm(setFormData),
        loadProjectData: useCreateLoadProjectData(setFormData),
        getSubmissionData: useCreateGetSubmissionData(formData),
    };
};

/**
 * Hook para manejar el estado del formulario de proyecto
 *
 * @param {object|null} initialData - Los datos iniciales del proyecto para poblar el formulario
 * @returns {object} Un objeto con el estado del formulario y funciones para manipularlo
 */
export const useProjectFormState = (initialData = null) => {
    const [formData, setFormData] = useState(() =>
        initialData ? transformProjectDataForForm(initialData) : getInitialFormData(),
    );
    const actions = useFormActions(setFormData, formData);
    return {
        formData,
        setFormData,
        ...actions,
    };
};
