// myPortfolio/client/src/pages/admin/projects/ProjectForm.jsx
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaSave, FaArrowLeft, FaTimes } from 'react-icons/fa';
import { useNavigate, useParams, Link } from 'react-router-dom';

import './ProjectForm.css';

import FormInput from '../../../components/common/FormInput.jsx';
import StateFeedback from '../../../components/common/StateFeedback.jsx';
import { useProject } from '../../../hooks/projects/useProject.js';
import { useProjectCreate } from '../../../hooks/projects/useProjectCreate.js';
import { useProjectFormState } from '../../../hooks/projects/useProjectFormState.js';
import { useProjectFormValidation } from '../../../hooks/projects/useProjectFormValidation.js';
import { useProjectUpdate } from '../../../hooks/projects/useProjectUpdate.js';

// Componente para el campo de título
const TitleField = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-row'>
        <FormInput
            id='title'
            name='title'
            label='Título del Proyecto *'
            value={formData.title}
            onChange={handleChange}
            error={formErrors.title}
            disabled={operationStatus.loading}
            placeholder='Ej: Sistema de Gestión de Inventario'
            maxLength={150}
        />
    </div>
);
TitleField.propTypes = {
    formData: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para el campo de descripción corta
const ShortDescriptionField = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-row'>
        <FormInput
            id='shortDescription'
            name='shortDescription'
            label='Descripción Corta *'
            placeholder='Breve descripción para tarjetas de proyecto'
            value={formData.shortDescription}
            onChange={handleChange}
            error={formErrors.shortDescription}
            disabled={operationStatus.loading}
            maxLength={300}
        />
        <small>Entre 10 y 300 caracteres</small>
    </div>
);
ShortDescriptionField.propTypes = {
    formData: PropTypes.shape({
        shortDescription: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        shortDescription: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para el campo de descripción larga
const LongDescriptionField = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-row'>
        <FormInput
            id='longDescription'
            name='longDescription'
            label='Descripción Completa *'
            value={formData.longDescription}
            onChange={handleChange}
            error={formErrors.longDescription}
            disabled={operationStatus.loading}
            isTextarea={true}
            placeholder='Descripción detallada del proyecto, objetivos, desafíos superados, tecnologías utilizadas, etc.'
        />
        <small>Entre 50 y 5000 caracteres</small>
    </div>
);
LongDescriptionField.propTypes = {
    formData: PropTypes.shape({
        longDescription: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        longDescription: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para el campo de tecnologías
const TechnologiesField = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-row'>
        <FormInput
            id='technologies'
            name='technologies'
            label='Tecnologías Utilizadas *'
            placeholder='React, Node.js, MongoDB, Express (separadas por comas)'
            value={formData.technologies}
            onChange={handleChange}
            error={formErrors.technologies}
            disabled={operationStatus.loading}
        />
        <small>Separa las tecnologías con comas</small>
    </div>
);
TechnologiesField.propTypes = {
    formData: PropTypes.shape({
        technologies: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        technologies: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para el campo de URL de GitHub
const GitHubUrlField = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-row'>
        <FormInput
            id='githubUrl'
            name='githubUrl'
            label='URL de GitHub *'
            placeholder='https://github.com/usuario/proyecto'
            value={formData.githubUrl}
            onChange={handleChange}
            error={formErrors.githubUrl}
            disabled={operationStatus.loading}
        />
    </div>
);
GitHubUrlField.propTypes = {
    formData: PropTypes.shape({
        githubUrl: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        githubUrl: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para el campo de URL de demo en vivo
const LiveDemoUrlField = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-row'>
        <FormInput
            id='liveDemoUrl'
            name='liveDemoUrl'
            label='URL de Demo en Vivo'
            placeholder='https://demo.mi-proyecto.com'
            value={formData.liveDemoUrl}
            onChange={handleChange}
            error={formErrors.liveDemoUrl}
            disabled={operationStatus.loading}
        />
        <small>Opcional - URL donde se puede ver el proyecto funcionando</small>
    </div>
);
LiveDemoUrlField.propTypes = {
    formData: PropTypes.shape({
        liveDemoUrl: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        liveDemoUrl: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para el campo de URL de imagen
const ImageUrlField = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-row'>
        <FormInput
            id='imageUrl'
            name='imageUrl'
            label='URL de la Imagen Principal *'
            placeholder='https://ejemplo.com/imagen-proyecto.jpg'
            value={formData.imageUrl}
            onChange={handleChange}
            error={formErrors.imageUrl}
            disabled={operationStatus.loading}
        />
        <small>Imagen que se mostrará en las tarjetas y página de detalle</small>
    </div>
);
ImageUrlField.propTypes = {
    formData: PropTypes.shape({
        imageUrl: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        imageUrl: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para la vista previa de imagen
const ImagePreview = ({ imageUrl }) =>
    imageUrl && (
        <div className='image-preview'>
            <img
                src={imageUrl}
                alt='Vista previa'
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
        </div>
    );
ImagePreview.propTypes = {
    imageUrl: PropTypes.string,
};

// Componente para el checkbox de proyecto destacado
const FeaturedCheckbox = ({ formData, operationStatus, handleChange }) => (
    <div className='form-row checkbox-row'>
        <label className='checkbox-label'>
            <input
                type='checkbox'
                name='isFeatured'
                checked={formData.isFeatured}
                onChange={handleChange}
                disabled={operationStatus.loading}
            />
            <span className='checkbox-text'>
                <strong>Proyecto Destacado</strong>
                <small>Se mostrará en la sección de proyectos destacados de la página principal</small>
            </span>
        </label>
    </div>
);
FeaturedCheckbox.propTypes = {
    formData: PropTypes.shape({
        isFeatured: PropTypes.bool,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para la sección de información básica
const BasicInfoSection = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-section'>
        <h3>Información Básica</h3>
        <TitleField
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
        <ShortDescriptionField
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
    </div>
);
BasicInfoSection.propTypes = {
    formData: PropTypes.shape({
        title: PropTypes.string,
        shortDescription: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        title: PropTypes.string,
        shortDescription: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para la sección de descripción detallada
const DetailedDescriptionSection = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-section'>
        <h3>Descripción Detallada</h3>
        <LongDescriptionField
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
    </div>
);
DetailedDescriptionSection.propTypes = {
    formData: PropTypes.shape({
        longDescription: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        longDescription: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para la sección de tecnologías y enlaces
const TechnologiesAndLinksSection = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-section'>
        <h3>Tecnologías y Enlaces</h3>
        <TechnologiesField
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
        <GitHubUrlField
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
        <LiveDemoUrlField
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
    </div>
);
TechnologiesAndLinksSection.propTypes = {
    formData: PropTypes.shape({
        technologies: PropTypes.string,
        githubUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
    }).isRequired,
    formErrors: PropTypes.shape({
        technologies: PropTypes.string,
        githubUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para la sección de imagen y configuración
const ImageAndConfigSection = ({ formData, formErrors, operationStatus, handleChange }) => (
    <div className='form-section'>
        <h3>Imagen y Configuración</h3>
        <ImageUrlField
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
        <ImagePreview imageUrl={formData.imageUrl} />
        <FeaturedCheckbox formData={formData} operationStatus={operationStatus} handleChange={handleChange} />
    </div>
);
ImageAndConfigSection.propTypes = {
    formData: PropTypes.shape({
        imageUrl: PropTypes.string,
        isFeatured: PropTypes.bool,
    }).isRequired,
    formErrors: PropTypes.shape({
        imageUrl: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Componente para renderizar todas las secciones del formulario
const FormSections = ({ formData, formErrors, operationStatus, handleChange }) => (
    <>
        <BasicInfoSection
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
        <DetailedDescriptionSection
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
        <TechnologiesAndLinksSection
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
        <ImageAndConfigSection
            formData={formData}
            formErrors={formErrors}
            operationStatus={operationStatus}
            handleChange={handleChange}
        />
    </>
);
FormSections.propTypes = {
    formData: PropTypes.shape({
        title: PropTypes.string,
        shortDescription: PropTypes.string,
        longDescription: PropTypes.string,
        technologies: PropTypes.string,
        githubUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
        imageUrl: PropTypes.string,
        isFeatured: PropTypes.bool,
    }).isRequired,
    formErrors: PropTypes.shape({
        title: PropTypes.string,
        shortDescription: PropTypes.string,
        longDescription: PropTypes.string,
        technologies: PropTypes.string,
        githubUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    operationStatus: PropTypes.shape({
        loading: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

// Helper: Encabezado de la página
const ProjectFormHeader = ({ isEditing }) => (
    <div className='admin-page-header'>
        <div className='admin-page-title-section'>
            <h1>{isEditing ? 'Editar Proyecto' : 'Crear Proyecto'}</h1>
            <p>{isEditing ? 'Modifica los datos del proyecto' : 'Añade un nuevo proyecto a tu portafolio'}</p>
        </div>
        <div className='admin-page-actions'>
            <Link to='/admin/projects' className='admin-back-button'>
                <FaArrowLeft /> Volver a Proyectos
            </Link>
        </div>
    </div>
);
ProjectFormHeader.propTypes = {
    isEditing: PropTypes.bool.isRequired,
};

// Helper: Mensajes de estado
const ProjectFormStatus = ({ operationStatus, isEditing }) => (
    <>
        {operationStatus.success && (
            <StateFeedback type='success' message={`Proyecto ${isEditing ? 'actualizado' : 'creado'} correctamente`} />
        )}
        {operationStatus.error && <StateFeedback type='error' message={operationStatus.error} />}
    </>
);
ProjectFormStatus.propTypes = {
    operationStatus: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
};

// Helper: Acciones del formulario
const ProjectFormActions = ({ operationStatus, isEditing, navigate }) => (
    <div className='form-actions'>
        <button
            type='button'
            className='admin-cancel-button'
            onClick={() => navigate('/admin/projects')}
            disabled={operationStatus.loading}
        >
            <FaTimes /> Cancelar
        </button>
        <button type='submit' className='admin-submit-button' disabled={operationStatus.loading}>
            <FaSave />
            {operationStatus.loading
                ? isEditing
                    ? 'Guardando...'
                    : 'Creando...'
                : isEditing
                  ? 'Guardar Cambios'
                  : 'Crear Proyecto'}
        </button>
    </div>
);
ProjectFormActions.propTypes = {
    operationStatus: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
};

/**
 * Hook personalizado para manejar la lógica del formulario de proyecto, incluyendo carga, validación y envío.
 *
 * @param {string} id - ID del proyecto (si se está editando).
 * @param {object} formState - Gestor del estado del formulario.
 * @param {object} validation - Gestor de validación.
 * @param {object} createMutation - Mutación para crear un proyecto.
 * @param {object} updateMutation - Mutación para actualizar un proyecto.
 * @param {Function} navigate - Función de navegación.
 * @returns {object} Manejadores y estado de la lógica del formulario.
 */
function useProjectFormLogic(id, formState, validation, createMutation, updateMutation, navigate) {
    const isEditing = !!id;
    const { data: projectData, loading: loadingProject, error: projectError } = useProject(id);
    const [formInitialized, setFormInitialized] = useState(false);
    useProjectFormTitle(isEditing);
    useProjectFormDataLoader(isEditing, projectData, formInitialized, setFormInitialized, formState);
    const handleFieldChange = createHandleFieldChange(formState, validation);
    const handleSubmit = createHandleSubmit(
        isEditing,
        id,
        formState,
        validation,
        createMutation,
        updateMutation,
        navigate,
    );
    const operationStatus = isEditing ? updateMutation : createMutation;
    return {
        isEditing,
        projectData,
        loadingProject,
        projectError,
        operationStatus,
        handleFieldChange,
        handleSubmit,
        formInitialized,
    };
}

/**
 * Establece el título del documento según el estado de edición.
 *
 * @param {boolean} isEditing Indica si el formulario está en modo edición.
 */
function useProjectFormTitle(isEditing) {
    useEffect(() => {
        document.title = isEditing
            ? 'Editar Proyecto - Panel de Administración'
            : 'Crear Proyecto - Panel de Administración';
        return () => {
            document.title = 'Deiby Arango - Portfolio';
        };
    }, [isEditing]);
}

/**
 * Carga los datos del proyecto en el estado del formulario si se está editando.
 *
 * @param {boolean} isEditing - Indica si el formulario está en modo edición.
 * @param {object} projectData - Datos del proyecto a cargar.
 * @param {boolean} formInitialized - Indica si el formulario ya fue inicializado.
 * @param {Function} setFormInitialized - Función para establecer el estado de inicialización.
 * @param {object} formState - Gestor del estado del formulario.
 */
function useProjectFormDataLoader(isEditing, projectData, formInitialized, setFormInitialized, formState) {
    useEffect(() => {
        if (isEditing && projectData && !formInitialized) {
            formState.loadProjectData(projectData);
            setFormInitialized(true);
        }
    }, [isEditing, projectData, formInitialized, setFormInitialized, formState]);
}

/**
 * Retorna un manejador para los cambios en los campos.
 *
 * @param {object} formState - Gestor del estado del formulario.
 * @param {object} validation - Gestor de validación del formulario.
 * @returns {Function} Manejador de eventos para cambios en los campos del formulario.
 */
function createHandleFieldChange(formState, validation) {
    return (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        formState.updateField(name, fieldValue);
        if (validation.errors[name]) {
            validation.clearFieldError(name);
        }
        if (['title', 'shortDescription', 'longDescription'].includes(name)) {
            if (validation.validateSingleField) {
                setTimeout(() => {
                    validation.validateSingleField(name, fieldValue);
                }, 500);
            }
        }
    };
}

/**
 * Retorna un manejador para el envío del formulario.
 *
 * @param {boolean} isEditing - Indica si el formulario está en modo edición.
 * @param {string} id - ID del proyecto (si se está editando).
 * @param {object} formState - Gestor del estado del formulario.
 * @param {object} validation - Gestor de validación del formulario.
 * @param {object} createMutation - Mutación para crear un proyecto.
 * @param {object} updateMutation - Mutación para actualizar un proyecto.
 * @param {Function} navigate - Función de navegación.
 * @returns {Function} Manejador de evento para el envío del formulario.
 */
function createHandleSubmit(isEditing, id, formState, validation, createMutation, updateMutation, navigate) {
    return async (e) => {
        e.preventDefault();
        const isValid = validation.validateForm(formState.formData);
        if (!isValid) {
            return;
        }
        const submissionData = formState.getSubmissionData();
        try {
            if (isEditing) {
                await updateMutation.mutate(id, submissionData);
            } else {
                await createMutation.mutate(submissionData);
            }
            navigate('/admin/projects');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error al procesar formulario:', error);
        }
    };
}

/**
 * Renderiza un estado de carga.
 *
 * @param {boolean} isEditing - Indica si el formulario está en modo edición.
 * @param {boolean} loadingProject - Indica si se está cargando el proyecto.
 * @returns {React.Element|null} El componente de estado de carga o null.
 */
function renderLoading(isEditing, loadingProject) {
    if (isEditing && loadingProject) {
        return <StateFeedback type='loading' message='Cargando proyecto...' />;
    }
    return null;
}

/**
 * Renderiza un estado de error.
 *
 * @param {boolean} isEditing - Indica si el formulario está en modo edición.
 * @param {string} projectError - Mensaje de error del proyecto.
 * @returns {React.Element|null} El componente de estado de error o null.
 */
function renderError(isEditing, projectError) {
    if (isEditing && projectError) {
        return (
            <div className='project-form-container'>
                <StateFeedback type='error' message={projectError} />
                <Link to='/admin/projects' className='admin-back-button'>
                    <FaArrowLeft /> Volver a Proyectos
                </Link>
            </div>
        );
    }
    return null;
}

/**
 * Renderiza el contenido principal del formulario de proyecto, incluyendo encabezado, estado, secciones y acciones.
 *
 * @param {object} props - Las props para ProjectFormContent.
 * @param {boolean} props.isEditing - Indica si el formulario está en modo edición.
 * @param {object} props.operationStatus - El objeto de estado para las operaciones de creación/actualización.
 * @param {Function} props.handleFieldChange - Manejador para los cambios en los campos.
 * @param {Function} props.handleSubmit - Manejador para el envío del formulario.
 * @param {object} props.formState - Gestor de estado para el formulario.
 * @param {object} props.validation - Gestor de validación para el formulario.
 * @param {Function} props.navigate - Función de navegación.
 * @returns {React.Element} El contenido renderizado del formulario de proyecto.
 */
function ProjectFormContent({
    isEditing,
    operationStatus,
    handleFieldChange,
    handleSubmit,
    formState,
    validation,
    navigate,
}) {
    return (
        <div className='project-form-container'>
            <ProjectFormHeader isEditing={isEditing} />
            <ProjectFormStatus operationStatus={operationStatus} isEditing={isEditing} />
            <form className='admin-form project-form' onSubmit={handleSubmit}>
                <FormSections
                    formData={formState.formData}
                    formErrors={validation.errors}
                    operationStatus={operationStatus}
                    handleChange={handleFieldChange}
                />
                <ProjectFormActions operationStatus={operationStatus} isEditing={isEditing} navigate={navigate} />
            </form>
        </div>
    );
}
ProjectFormContent.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    operationStatus: PropTypes.object.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formState: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
};

/**
 * Componente principal del formulario de proyecto.
 *
 * @returns {React.Element} El formulario de proyecto.
 */
function ProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const createMutation = useProjectCreate();
    const updateMutation = useProjectUpdate();
    const formState = useProjectFormState();
    const validation = useProjectFormValidation();
    const { isEditing, loadingProject, projectError, operationStatus, handleFieldChange, handleSubmit } =
        useProjectFormLogic(id, formState, validation, createMutation, updateMutation, navigate);
    const loadingComponent = renderLoading(isEditing, loadingProject);
    if (loadingComponent) {
        return loadingComponent;
    }
    const errorComponent = renderError(isEditing, projectError);
    if (errorComponent) {
        return errorComponent;
    }
    return (
        <ProjectFormContent
            isEditing={isEditing}
            operationStatus={operationStatus}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
            formState={formState}
            validation={validation}
            navigate={navigate}
        />
    );
}

export default ProjectForm;
