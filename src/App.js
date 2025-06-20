import React, { useState, useEffect } from 'react';

// Importar jsPDF para la generación de PDF
// Para este entorno, confiamos en la carga via script tag en index.html.
const jsPDF = window.jspdf ? window.jspdf.jsPDF : null;

// --- Iconos (simulando lucide-react) ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const FilePlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
  </svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h12a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h12a2 2 0 0 0 2-2v-3"/><path d="M2 7v3a2 2 0 0 0 0 4h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="17 17 22 12 17 7"/><line x1="22" x2="11" y1="12" y2="12"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

// --- Componente de Mensaje Personalizado ---
const CustomMessage = ({ message, type, onClose }) => {
  if (!message) return null;

  let bgColor, textColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'info':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-xl p-6 shadow-lg max-w-sm w-full ${bgColor} ${textColor} text-center`}>
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

// --- Componente de Inicio de Sesión ---
const Login = ({ onLogin }) => {
  const [colegiado, setColegiado] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (colegiado === '12345' && password === 'password') { // Credenciales de ejemplo
      setMessage('¡Inicio de sesión exitoso!');
      setMessageType('success');
      setTimeout(() => {
        onLogin(colegiado);
        setMessage('');
      }, 1500);
    } else {
      setMessage('Número de colegiado o contraseña incorrectos.');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-inter">
      <CustomMessage message={message} type={messageType} onClose={() => setMessage('')} />
      <div className="text-center text-blue-900 text-lg font-semibold mb-8">
        Plataforma con uso educativo generada por Oscar Iván Aguilar.
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Iniciar Sesión Notario</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <img
            src="https://placehold.co/100x60/000080/FFFFFF?text=Logo+CUNTOTO"
            alt="Logo CUNTOTO"
            className="h-14 w-auto rounded-md shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x60/CCCCCC/000000?text=CUNTOTO'; }}
          />
          <img
            src="https://placehold.co/120x60/000080/FFFFFF?text=Colegio+Abogados+Guatemala"
            alt="Logo Colegio de Abogados de Guatemala"
            className="h-14 w-auto rounded-md shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/120x60/CCCCCC/000000?text=Abogados'; }}
          />
          <img
            src="https://placehold.co/100x60/000080/FFFFFF?text=Organismo+Judicial"
            alt="Logo Organismo Judicial"
            className="h-14 w-auto rounded-md shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x60/CCCCCC/000000?text=Judicial'; }}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="colegiado">
              Número de Colegiado:
            </label>
            <input
              type="text"
              id="colegiado"
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
              value={colegiado}
              onChange={(e) => setColegiado(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="password">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Componente de Dashboard (solo contenido, sin sidebar) ---
const DashboardContent = ({ notaryId, onNavigate }) => {
  return (
    <>
      <h2 className="text-4xl font-bold text-blue-900 mb-6">
        Bienvenido, Notario {notaryId}
      </h2>
      <p className="text-blue-800 text-lg mb-8">
        Desde aquí puede gestionar sus instrumentos notariales y su información.
      </p>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => onNavigate('generarInstrumento')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-blue-900 hover:bg-blue-50"
        >
          <FilePlusIcon className="w-12 h-12 mb-4 text-blue-700" />
          <span className="text-xl font-semibold">Generar Nuevo Instrumento</span>
        </button>
        <button
          onClick={() => onNavigate('consultarInstrumentos')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-blue-900 hover:bg-blue-50"
        >
          <FileTextIcon className="w-12 h-12 mb-4 text-blue-700" />
          <span className="text-xl font-semibold">Consultar Instrumentos</span>
        </button>
        <button
          onClick={() => onNavigate('pagos')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-blue-900 hover:bg-blue-50"
        >
          <WalletIcon className="w-12 h-12 mb-4 text-blue-700" />
          <span className="text-xl font-semibold">Realizar Pagos</span>
        </button>
      </div>

      {/* Logos Section */}
      <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Instituciones Aliadas</h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img
            src="https://placehold.co/150x80/000080/FFFFFF?text=Logo+CUNTOTO"
            alt="Logo CUNTOTO"
            className="h-20 w-auto rounded-md shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x80/CCCCCC/000000?text=Logo+CUNTOTO+Error'; }}
          />
          <img
            src="https://placehold.co/180x80/000080/FFFFFF?text=Colegio+Abogados+Guatemala"
            alt="Logo Colegio de Abogados de Guatemala"
            className="h-20 w-auto rounded-md shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/180x80/CCCCCC/000000?text=Colegio+Abogados+Error'; }}
          />
          <img
            src="https://placehold.co/150x80/000080/FFFFFF?text=Organismo+Judicial"
            alt="Logo Organismo Judicial"
            className="h-20 w-auto rounded-md shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x80/CCCCCC/000000?text=Organismo+Judicial+Error'; }}
          />
        </div>
        <p className="text-center text-blue-700 text-sm mt-4">
          (Los logotipos mostrados son solo de ejemplo.)
        </p>
      </div>
    </>
  );
};


// --- Componente Actualizar Información (solo contenido) ---
const ActualizarInformacion = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setMessage('Información actualizada exitosamente.');
    setMessageType('success');
    // Simular guardado de datos
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg font-inter">
      <CustomMessage message={message} type={messageType} onClose={() => setMessage('')} />
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Actualizar Información del Notario</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="nombre">
            Nombre Completo:
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            defaultValue="Juan Pérez"
          />
        </div>
        <div>
          <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="direccion">
            Dirección:
          </label>
          <input
            type="text"
            id="direccion"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            defaultValue="12 Calle 5-67 Zona 1, Ciudad de Guatemala"
          />
        </div>
        <div>
          <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="telefono">
            Teléfono:
          </label>
          <input
            type="tel"
            id="telefono"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            defaultValue="5555-1234"
          />
        </div>
        <div>
          <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="email">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            defaultValue="juan.perez@notario.com"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

// --- Componente Generar Instrumento (solo contenido) ---
const GenerarInstrumento = ({ onGoBack, onInstrumentGenerated }) => {
  const [instrumentType, setInstrumentType] = useState('');
  const [protocoloNum, setProtocoloNum] = useState('');
  const [fechaOtorgamiento, setFechaOtorgamiento] = useState('');
  const [lugarOtorgamiento, setLugarOtorgamiento] = useState('');
  const [nombreNotario, setNombreNotario] = useState('Notario Juan Pérez'); // Valor predeterminado
  const [partes, setPartes] = useState([{ nombre: '', tipoIdentificacion: '', numIdentificacion: '', edad: '', estadoCivil: '', nacionalidad: '', profesion: '', domicilio: '' }]);
  const [negocioJuridicoType, setNegocioJuridicoType] = useState('');
  const [contenido, setContenido] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [signedDocument, setSignedDocument] = useState(null);

  useEffect(() => {
    // Generar un número de protocolo único para cada nuevo instrumento
    setProtocoloNum(`PROT-${Date.now()}`);
    setFechaOtorgamiento(new Date().toISOString().slice(0, 10)); // Fecha actual
    setLugarOtorgamiento('Ciudad de Guatemala'); // Lugar predeterminado
  }, []);

  // Templates para actos jurídicos para precargar el textarea 'contenido'
  const negocioTemplates = {
    '': '', // Opción vacía por defecto
    'Compraventa de Bien Inmueble': `PRIMERO: DECLARACIÓN DE PROPIEDAD. Manifiesta el vendedor ser propietario del bien inmueble urbano, consistente en casa de un nivel, ubicada en la [dirección del inmueble], el cual mide [medidas] y colinda con [colindancias], con número de registro [número de registro] en el Registro General de la Propiedad.

SEGUNDO: DEL PRECIO Y FORMA DE PAGO. El precio de la presente compraventa es de [monto en quetzales] (Q. [monto numérico]), los cuales son pagados por el comprador en este acto a satisfacción del vendedor.

TERCERO: SANEAMIENTO. El vendedor declara que sobre el inmueble objeto de la venta no pesan gravámenes, anotaciones o limitaciones que puedan afectar los derechos del comprador, y en todo caso, se obliga al saneamiento de ley.

CUARTO: ACEPTACIÓN. El comprador acepta la venta que se le hace del inmueble relacionado y en los términos aquí estipulados.

QUINTA: OTORGAMIENTO. Los otorgantes, por medio de este instrumento público, otorgan la presente escritura de compraventa, declarando su conformidad con todo lo aquí establecido.`,
    'Mandato General con Representación': `PRIMERO: OBJETO DEL MANDATO. El mandante otorga MANDATO GENERAL CON REPRESENTACIÓN a favor del mandatario para que, en su nombre y representación, ejercite todos los actos y negocios jurídicos permitidos por la ley, incluyendo, pero no limitándose a, la administración de bienes, cobro de deudas, representación judicial y extrajudicial, y cualquier otro acto que redunde en beneficio del mandante.

SEGUNDO: FACULTADES ESPECIALES. El mandatario tendrá las facultades especiales que la ley exige para los siguientes actos: [especificar facultades especiales si las hay, ej. vender, hipotecar, etc.].

TERCERO: ACEPTACIÓN DEL MANDATO. El mandatario, presente en este acto, acepta el mandato que por este instrumento público se le confiere, declarando que lo ejecutará fiel y lealmente, cumpliendo con todas las obligaciones inherentes a su cargo.`,
    'Donación entre Vivos': `PRIMERO: OBJETO DE LA DONACIÓN. El donante, por este acto, hace DONACIÓN PURA Y SIMPLE, INTER VIVOS, a título gratuito, a favor del donatario del bien [descripción del bien, ej. inmueble, vehículo, dinero], ubicado en [dirección/ubicación], con las siguientes medidas y colindancias: [medidas y colindancias].

SEGUNDO: VALOR Y SANEAMIENTO. El valor del bien donado asciende a [monto en quetzales] (Q. [monto numérico]). El donante declara que sobre el bien objeto de la donación no pesan gravámenes, anotaciones o limitaciones que puedan afectar los derechos del donatario y, en todo caso, se obliga al saneamiento de ley.

TERCERO: ACEPTACIÓN. El donatario, presente en este acto, acepta expresamente la donación que se le hace del bien descrito, agradeciendo la liberalidad del donante.`,
    'Constitución de Sociedad Anónima': `PRIMERO: LOS SOCIOS FUNDADORES. Los comparecientes manifiestan ser los socios fundadores de la sociedad que por este acto se constituye, y declaran su voluntad de conformar una sociedad anónima bajo las leyes de la República de Guatemala.

SEGUNDO: DENOMINACIÓN Y DOMICILIO. La sociedad se denominará "[Nombre de la Sociedad], Sociedad Anónima" o su abreviatura "[Nombre de la Sociedad], S.A.", y tendrá su domicilio en [Domicilio de la sociedad].

TERCERO: OBJETO SOCIAL. El objeto principal de la sociedad será [Descripción detallada del objeto social, ej. la prestación de servicios profesionales, la compraventa de bienes inmuebles, el comercio al por mayor y menor de productos varios, etc.].

CUARTO: CAPITAL SOCIAL. El capital autorizado de la sociedad será de [monto en quetzales] (Q. [monto numérico]), dividido y representado en [número] acciones comunes y nominativas de un valor nominal de [valor de cada acción] (Q. [valor numérico]) cada una. El capital pagado inicial será de [monto en quetzales] (Q. [monto numérico]).

QUINTO: ÓRGANO DE ADMINISTRACIÓN Y REPRESENTACIÓN. La administración de la sociedad estará a cargo de un [Órgano de administración, ej. Administrador Único, Consejo de Administración]. El primer [cargo] será [Nombre del primer administrador].

SEXTO: INSCRIPCIÓN Y VIGENCIA. La sociedad iniciará sus operaciones una vez inscrita en el Registro Mercantil General de la República de Guatemala y tendrá una vigencia indefinida.`,
    'Testamento Común Abierto': `PRIMERO: DECLARACIÓN DEL TESTADOR. Yo, [Nombre Completo del Testador], identificado como [Tipo y Número de Identificación], de [edad] años de edad, [estado civil], de nacionalidad [nacionalidad], [profesión/ocupación], y con domicilio en [domicilio del testador], en pleno uso de mis facultades mentales y por mi libre y espontánea voluntad, otorgo el presente testamento común abierto, que será mi última y expresa voluntad.

SEGUNDO: DECLARACIÓN DE ESTADO CIVIL Y FAMILIAR. Declaro que soy [estado civil, ej. soltero/a, casado/a con [nombre del cónyuge], viudo/a de [nombre del cónyuge], unido/a de hecho con [nombre del conviviente]]. Tengo [número] hijos, cuyos nombres son [Nombres Completos de los Hijos].

TERCERO: DESIGNACIÓN DE HEREDEROS. Instituyo como mi universal heredero(s) de todos mis bienes, derechos y acciones, presentes y futuros, a [Nombre(s) Completo(s) del/los Heredero(s)], en [especificar la proporción, ej. partes iguales, o la totalidad si es uno solo].

CUARTO: LEGADOS (Opcional). [En caso de haber legados, especificar aquí los bienes específicos y a quiénes se legan, ej. Lego a [Nombre del Legatario] mi bien inmueble ubicado en [dirección].]

QUINTO: ALBACEA. Designo como mi Albacea Testamentario a [Nombre Completo del Albacea], quien podrá ejercer el cargo con o sin fianza, por el plazo que la ley establece.

SEXTO: REVOCACIÓN. Revocho cualquier testamento o disposición testamentaria anterior que haya otorgado, siendo el presente mi única y última voluntad.

SÉPTIMO: LECTURA Y RATIFICACIÓN. Leída que me fue íntegramente esta escritura, de su contenido me enteré, la ratifico, acepto y firmo junto con los testigos y el notario que autoriza.`,
  };

  const handleNegocioJuridicoChange = (e) => {
    const selectedType = e.target.value;
    setNegocioJuridicoType(selectedType);
    if (negocioTemplates[selectedType]) {
      setContenido(negocioTemplates[selectedType]);
    } else {
      setContenido('');
    }
  };

  const addParte = () => {
    setPartes([...partes, { nombre: '', tipoIdentificacion: '', numIdentificacion: '', edad: '', estadoCivil: '', nacionalidad: '', profesion: '', domicilio: '' }]);
  };

  const updateParte = (index, field, value) => {
    const newPartes = [...partes];
    newPartes[index][field] = value;
    setPartes(newPartes);
  };

  const simulateRenapConsultation = (index) => {
    // Simulación de datos de RENAP
    const dummyData = [
      {
        nombre: 'María Fernanda López García',
        tipoIdentificacion: 'DPI',
        numIdentificacion: '2548789630101',
        edad: '35',
        estadoCivil: 'Soltera',
        nacionalidad: 'Guatemalteca',
        profesion: 'Abogada',
        domicilio: 'Ciudad de Guatemala',
      },
      {
        nombre: 'Carlos Ernesto Morales Díaz',
        tipoIdentificacion: 'DPI',
        numIdentificacion: '1234567890101',
        edad: '40',
        estadoCivil: 'Casado',
        nacionalidad: 'Guatemalteco',
        profesion: 'Ingeniero',
        domicilio: 'Mixco, Guatemala',
      },
      {
        nombre: 'Ana Patricia García Soto',
        tipoIdentificacion: 'DPI',
        numIdentificacion: '9876543210101',
        edad: '28',
        estadoCivil: 'Soltera',
        nacionalidad: 'Guatemalteca',
        profesion: 'Estudiante',
        domicilio: 'Villa Nueva, Guatemala',
      },
    ];

    // Selecciona una entrada de datos de ejemplo aleatoria o cíclica
    const dataToUse = dummyData[index % dummyData.length];

    const newPartes = [...partes];
    newPartes[index] = { ...newPartes[index], ...dataToUse };
    setPartes(newPartes);
    setMessage(`Datos de RENAP simulados cargados para Parte ${index + 1}.`);
    setMessageType('info');
    setTimeout(() => setMessage(''), 3000);
  };


  const handleGeneratePdf = () => {
    if (!instrumentType || !protocoloNum || !fechaOtorgamiento || !lugarOtorgamiento || partes.some(p => !p.nombre) || !contenido) {
      setMessage('Por favor, complete todos los campos requeridos para generar el PDF.');
      setMessageType('error');
      return;
    }

    if (!jsPDF) {
      setMessage('La librería jsPDF no está cargada. No se puede generar el PDF.');
      setMessageType('error');
      return;
    }

    const doc = new jsPDF();
    let y = 20; // Posición inicial Y

    // Título
    doc.setFontSize(16);
    doc.text(`INSTRUMENTO PÚBLICO - ${instrumentType.toUpperCase()}`, 105, y, { align: 'center' });
    y += 10;

    // Encabezado
    doc.setFontSize(10);
    doc.text(`Número de Protocolo: ${protocoloNum}`, 20, y);
    y += 5;
    doc.text(`En la ciudad de ${lugarOtorgamiento}, el ${fechaOtorgamiento}.`, 20, y);
    y += 5;
    doc.text(`Ante mí: ${nombreNotario}, Notario.`, 20, y);
    y += 15;

    // Comparecencia y Datos de las Partes
    doc.setFontSize(12);
    doc.text('COMPARECEN:', 20, y);
    y += 7;

    partes.forEach((parte, index) => {
      doc.setFontSize(10);
      doc.text(`PARTE ${index + 1}:`, 25, y);
      y += 5;
      doc.text(`Nombre: ${parte.nombre}`, 30, y);
      y += 5;
      doc.text(`Identificación: ${parte.tipoIdentificacion} ${parte.numIdentificacion}`, 30, y);
      y += 5;
      doc.text(`Edad: ${parte.edad}, Estado Civil: ${parte.estadoCivil}, Nacionalidad: ${parte.nacionalidad}`, 30, y);
      y += 5;
      doc.text(`Profesión/Ocupación: ${parte.profesion}, Domicilio: ${parte.domicilio}`, 30, y);
      y += 10;
      if (y > 280 && index < partes.length - 1) { // Si casi no queda espacio, nueva página
        doc.addPage();
        y = 20;
      }
    });

    // Cuerpo del Instrumento
    doc.setFontSize(12);
    doc.text('CONTENIDO DEL NEGOCIO JURÍDICO:', 20, y);
    y += 7;

    doc.setFontSize(10);
    const splitContent = doc.splitTextToSize(contenido, 170); // Ancho de texto de 170mm
    doc.text(splitContent, 20, y);
    y += (splitContent.length * 5) + 10; // Espacio basado en el número de líneas

    if (y > 280) { // Si casi no queda espacio, nueva página
      doc.addPage();
      y = 20;
    }

    // Conclusión y Firmas
    doc.setFontSize(12);
    doc.text('CONCLUSIÓN:', 20, y);
    y += 7;
    doc.setFontSize(10);
    doc.text('Leído que fue el presente instrumento a los otorgantes, quienes enterados de su contenido, objeto, validez y demás efectos legales, lo ratifican, aceptan y firman junto con el notario que autoriza.', 20, y, { maxWidth: 170 });
    y += 20;

    doc.text('Firma(s) de los Otorgantes:', 20, y);
    y += 15;
    // Espacio para firmas físicas
    partes.forEach((parte) => {
      doc.text('___________________________', 20, y);
      y += 5;
      doc.text(`${parte.nombre}`, 20, y);
      y += 10;
    });

    if (y > 280) { // Si casi no queda espacio, nueva página
      doc.addPage();
      y = 20;
    }

    doc.text(`Firma del Notario: ${nombreNotario}`, 20, y);
    y += 15;
    doc.text('___________________________', 20, y);
    y += 5;
    doc.text(`(Sello y Firma Electrónica del Notario)`, 20, y);

    doc.save(`${instrumentType}_${protocoloNum}.pdf`);

    setMessage('PDF del instrumento generado. Por favor, imprima, firme físicamente y luego suba el documento firmado.');
    setMessageType('info');
    setPdfGenerated(true);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSignedDocument(file);
      setMessage(`Documento firmado "${file.name}" listo para cargar.`);
      setMessageType('success');
    } else {
      setSignedDocument(null);
      setMessage('Por favor, seleccione un archivo PDF válido.');
      setMessageType('error');
    }
  };

  const handleSubmitInstrument = () => {
    if (!pdfGenerated) {
      setMessage('Debe generar el PDF primero.');
      setMessageType('error');
      return;
    }
    if (!signedDocument) {
      setMessage('Debe cargar el documento firmado en PDF.');
      setMessageType('error');
      return;
    }

    const newInstrument = {
      id: `INST-${Date.now()}`,
      type: instrumentType,
      protocolo: protocoloNum,
      fecha: fechaOtorgamiento,
      lugar: lugarOtorgamiento,
      notario: nombreNotario,
      partes: partes,
      contenido: contenido,
      status: 'Generado y Subido',
      signedFileName: signedDocument.name,
    };
    onInstrumentGenerated(newInstrument);
    setMessage('Instrumento público cargado exitosamente.');
    setMessageType('success');
    // Reiniciar el formulario después de la presentación exitosa
    setInstrumentType('');
    setProtocoloNum(`PROT-${Date.now()}`);
    setFechaOtorgamiento(new Date().toISOString().slice(0, 10));
    setLugarOtorgamiento('Ciudad de Guatemala');
    setPartes([{ nombre: '', tipoIdentificacion: '', numIdentificacion: '', edad: '', estadoCivil: '', nacionalidad: '', profesion: '', domicilio: '' }]);
    setNegocioJuridicoType('');
    setContenido('');
    setPdfGenerated(false);
    setSignedDocument(null);
    setTimeout(() => {
      setMessage('');
      onGoBack(); // Opcional: Volver al dashboard
    }, 2000);
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg font-inter">
      <CustomMessage message={message} type={messageType} onClose={() => setMessage('')} />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-900">Generar Instrumento Público</h2>
        <button
          onClick={onGoBack}
          className="bg-gray-200 hover:bg-gray-300 text-blue-900 font-semibold py-2 px-4 rounded-full transition duration-300"
        >
          Volver
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="instrumentType">
          Tipo de Instrumento:
        </label>
        <select
          id="instrumentType"
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
          value={instrumentType}
          onChange={(e) => setInstrumentType(e.target.value)}
          required
        >
          <option value="">Seleccione un tipo</option>
          <option value="Protocolar">Protocolar</option>
          <option value="Extraprotocolar">Extraprotocolar</option>
        </select>
      </div>

      <div className="space-y-6">
        {/* 1. Introducción */}
        <section className="p-6 border border-blue-200 rounded-xl bg-blue-50">
          <h3 className="text-xl font-bold text-blue-800 mb-4">1. Introducción</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2">Número de Protocolo:</label>
              <input type="text" className="w-full p-3 border border-blue-300 rounded-md bg-gray-100 text-blue-900" value={protocoloNum} readOnly />
            </div>
            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2">Lugar de Otorgamiento:</label>
              <input type="text" className="w-full p-3 border border-blue-300 rounded-md text-blue-900" value={lugarOtorgamiento} onChange={(e) => setLugarOtorgamiento(e.target.value)} required />
            </div>
            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2">Fecha de Otorgamiento:</label>
              <input type="date" className="w-full p-3 border border-blue-300 rounded-md text-blue-900" value={fechaOtorgamiento} onChange={(e) => setFechaOtorgamiento(e.target.value)} required />
            </div>
            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2">Datos del Notario:</label>
              <input type="text" className="w-full p-3 border border-blue-300 rounded-md bg-gray-100 text-blue-900" value={nombreNotario} readOnly />
            </div>
          </div>

          <h4 className="text-lg font-semibold text-blue-800 mt-6 mb-3">Comparecencia y Datos de las Partes:</h4>
          {partes.map((parte, index) => (
            <div key={index} className="border border-blue-100 p-4 rounded-lg mb-4 bg-white shadow-sm">
              <h5 className="text-md font-semibold text-blue-700 mb-3">Parte {index + 1}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-full md:col-span-2 lg:col-span-2 flex items-end gap-2">
                  <div className="flex-grow">
                    <label className="block text-blue-900 text-sm font-medium mb-1">Nombre Completo:</label>
                    <input type="text" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.nombre} onChange={(e) => updateParte(index, 'nombre', e.target.value)} required />
                  </div>
                  <button
                    type="button"
                    onClick={() => simulateRenapConsultation(index)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full h-10 w-10 flex items-center justify-center shadow-md flex-shrink-0"
                    title="Consultar RENAP (simulado)"
                  >
                    <SearchIcon className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <label className="block text-blue-900 text-sm font-medium mb-1">Tipo Identificación:</label>
                  <input type="text" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.tipoIdentificacion} onChange={(e) => updateParte(index, 'tipoIdentificacion', e.target.value)} />
                </div>
                <div>
                  <label className="block text-blue-900 text-sm font-medium mb-1">No. Identificación:</label>
                  <input type="text" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.numIdentificacion} onChange={(e) => updateParte(index, 'numIdentificacion', e.target.value)} />
                </div>
                <div>
                  <label className="block text-blue-900 text-sm font-medium mb-1">Edad:</label>
                  <input type="number" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.edad} onChange={(e) => updateParte(index, 'edad', e.target.value)} />
                </div>
                <div>
                  <label className="block text-blue-900 text-sm font-medium mb-1">Estado Civil:</label>
                  <input type="text" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.estadoCivil} onChange={(e) => updateParte(index, 'estadoCivil', e.target.value)} />
                </div>
                <div>
                  <label className="block text-blue-900 text-sm font-medium mb-1">Nacionalidad:</label>
                  <input type="text" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.nacionalidad} onChange={(e) => updateParte(index, 'nacionalidad', e.target.value)} />
                </div>
                <div>
                  <label className="block text-blue-900 text-sm font-medium mb-1">Profesión/Ocupación:</label>
                  <input type="text" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.profesion} onChange={(e) => updateParte(index, 'profesion', e.target.value)} />
                </div>
                <div>
                  <label className="block text-blue-900 text-sm font-medium mb-1">Domicilio:</label>
                  <input type="text" className="w-full p-2 border border-blue-200 rounded-md text-blue-900" value={parte.domicilio} onChange={(e) => updateParte(index, 'domicilio', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addParte}
            className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md"
          >
            Agregar Parte
          </button>
        </section>

        {/* 2. Cuerpo */}
        <section className="p-6 border border-blue-200 rounded-xl bg-blue-50">
          <h3 className="text-xl font-bold text-blue-800 mb-4">2. Cuerpo</h3>
          <div className="mb-4">
            <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="negocioJuridicoType">
              Seleccionar Negocio Jurídico:
            </label>
            <select
              id="negocioJuridicoType"
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
              value={negocioJuridicoType}
              onChange={handleNegocioJuridicoChange}
            >
              <option value="">Seleccione un tipo de negocio jurídico</option>
              {Object.keys(negocioTemplates).filter(key => key !== '').map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="contenido">
              Descripción del Negocio Jurídico y Contenido:
            </label>
            <textarea
              id="contenido"
              className="w-full p-3 border border-blue-300 rounded-md h-48 focus:ring-blue-500 focus:border-blue-500 text-blue-900"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Describa el objeto del negocio jurídico, las estipulaciones, cláusulas, términos y condiciones del contrato..."
              required
            ></textarea>
          </div>
        </section>

        {/* 3. Conclusión */}
        <section className="p-6 border border-blue-200 rounded-xl bg-blue-50">
          <h3 className="text-xl font-bold text-blue-800 mb-4">3. Conclusión</h3>
          <p className="text-blue-900 mb-4">
            Al dar por finalizado el llenado de los datos, presione "Generar PDF". Recuerde que deberá imprimir el documento generado, recabar las firmas físicas de las partes involucradas y luego subir el documento PDF ya firmado.
          </p>
          <button
            type="button"
            onClick={handleGeneratePdf}
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
          >
            Generar PDF del Instrumento
          </button>

          {pdfGenerated && (
            <div className="mt-6 p-4 border border-blue-300 rounded-lg bg-blue-50">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Subir Documento Firmado:</h4>
              <p className="text-blue-900 mb-4">
                Una vez impreso y firmado físicamente por las partes, cargue el documento PDF aquí:
              </p>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full p-2 border border-blue-300 rounded-md bg-white text-blue-900"
              />
              {signedDocument && (
                <p className="mt-2 text-sm text-green-700">Archivo seleccionado: {signedDocument.name}</p>
              )}
              <button
                onClick={handleSubmitInstrument}
                disabled={!signedDocument}
                className={`mt-4 w-full md:w-auto bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg ${!signedDocument ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Cargar Documento Firmado al Sistema
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// --- Componente Consultar Instrumentos (solo contenido) ---
const ConsultarInstrumentos = ({ instruments, onGoBack }) => {
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstruments = instruments.filter(instrument => {
    const matchesType = filterType === '' || instrument.type === filterType;
    const matchesSearch = searchTerm === '' ||
      instrument.protocolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instrument.partes.some(parte => parte.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      instrument.contenido.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg font-inter">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-900">Consultar Instrumentos Generados</h2>
        <button
          onClick={onGoBack}
          className="bg-gray-200 hover:bg-gray-300 text-blue-900 font-semibold py-2 px-4 rounded-full transition duration-300"
        >
          Volver
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <label htmlFor="filterType" className="block text-blue-900 text-sm font-semibold mb-2">Filtrar por Tipo:</label>
          <select
            id="filterType"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Protocolar">Protocolar</option>
            <option value="Extraprotocolar">Extraprotocolar</option>
          </select>
        </div>
        <div className="w-full md:w-2/3">
          <label htmlFor="searchTerm" className="block text-blue-900 text-sm font-semibold mb-2">Buscar:</label>
          <input
            type="text"
            id="searchTerm"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            placeholder="Buscar por No. Protocolo, Partes, Contenido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredInstruments.length === 0 ? (
        <p className="text-blue-700 text-lg text-center mt-10">No hay instrumentos generados que coincidan con su búsqueda.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full bg-white border border-blue-200">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold rounded-tl-xl">Tipo</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">No. Protocolo</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Fecha</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Partes Involucradas</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Archivo Firmado</th>
                <th className="py-3 px-4 text-left text-sm font-semibold rounded-tr-xl">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstruments.map((instrument, index) => (
                <tr key={instrument.id} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="py-3 px-4 text-blue-900">{instrument.type}</td>
                  <td className="py-3 px-4 text-blue-900">{instrument.protocolo}</td>
                  <td className="py-3 px-4 text-blue-900">{instrument.fecha}</td>
                  <td className="py-3 px-4 text-blue-900">
                    {instrument.partes.map(p => p.nombre).join(', ')}
                  </td>
                  <td className="py-3 px-4 text-blue-900">
                    {instrument.signedFileName ? (
                      <a href="#" className="text-blue-700 hover:underline" onClick={() => {
                        // Simular descarga o visualización del PDF
                        alert(`Simulando visualización de: ${instrument.signedFileName}`);
                      }}>
                        {instrument.signedFileName}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-blue-900">{instrument.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- Componente Pagos (solo contenido) ---
const Pagos = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setMessage('Simulando procesamiento de pago de timbres y papel sellado...');
    setMessageType('info');
    setTimeout(() => {
      setMessage('Pago procesado exitosamente con certificación electrónica.');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    }, 2000);
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg font-inter">
      <CustomMessage message={message} type={messageType} onClose={() => setMessage('')} />
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Gestión de Pagos de Impuestos</h2>
      <p className="text-blue-800 mb-6">
        Aquí podrá realizar el pago electrónico del impuesto de timbres fiscales y papel sellado para protocolo.
      </p>

      <form onSubmit={handleProcessPayment} className="space-y-6">
        <div>
          <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="montoTimbres">
            Monto de Timbres Fiscales (Q):
          </label>
          <input
            type="number"
            id="montoTimbres"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            placeholder="Ej: 150.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="montoPapelSellado">
            Monto de Papel Sellado (Q):
          </label>
          <input
            type="number"
            id="montoPapelSellado"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            placeholder="Ej: 50.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="metodoPago">
            Método de Pago:
          </label>
          <select
            id="metodoPago"
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-900"
            required
          >
            <option value="">Seleccione un método</option>
            <option value="bancaElectronica">Banca Electrónica</option>
            <option value="tarjetaCredito">Tarjeta de Crédito/Débito</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
        >
          Procesar Pago
        </button>
      </form>
    </div>
  );
};

// --- Componente Principal de la Aplicación ---
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notaryId, setNotaryId] = useState('');
  const [currentPage, setCurrentPage] = useState('login');
  const [instruments, setInstruments] = useState([]); // Almacenamiento simulado de instrumentos

  const handleLogin = (id) => {
    setNotaryId(id);
    setLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setNotaryId('');
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleInstrumentGenerated = (newInstrument) => {
    setInstruments([...instruments, newInstrument]);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
          {/* Sidebar - Se renderiza una sola vez cuando el usuario está logueado */}
          <aside className="w-full md:w-64 bg-blue-900 text-white p-6 flex flex-col items-center shadow-lg md:rounded-tr-xl md:rounded-br-xl">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold">AGP Digital</h1>
              <p className="text-sm text-blue-200">Notario: {notaryId}</p>
            </div>
            <nav className="space-y-4 w-full">
              <button
                onClick={() => handleNavigate('dashboard')}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-blue-800 transition duration-200 text-blue-100 font-semibold text-left"
              >
                <HomeIcon />
                <span>Inicio</span>
              </button>
              <button
                onClick={() => handleNavigate('actualizarInfo')}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-blue-800 transition duration-200 text-blue-100 font-semibold text-left"
              >
                <UserIcon />
                <span>Actualizar Información</span>
              </button>
              <button
                onClick={() => handleNavigate('generarInstrumento')}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-blue-800 transition duration-200 text-blue-100 font-semibold text-left"
              >
                <FilePlusIcon />
                <span>Generar Instrumento</span>
              </button>
              <button
                onClick={() => handleNavigate('consultarInstrumentos')}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-blue-800 transition duration-200 text-blue-100 font-semibold text-left"
              >
                <FileTextIcon />
                <span>Consultar Instrumentos</span>
              </button>
              <button
                onClick={() => handleNavigate('pagos')}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-blue-800 transition duration-200 text-blue-100 font-semibold text-left"
              >
                <WalletIcon />
                <span>Pagos</span>
              </button>
            </nav>
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center space-x-3 w-full p-3 rounded-lg bg-blue-700 hover:bg-red-600 text-white font-bold transition duration-300 shadow-md"
            >
              <LogOutIcon />
              <span>Cerrar Sesión</span>
            </button>
          </aside>

          {/* Contenido Principal - Renderiza el componente de la página actual */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {(() => {
              switch (currentPage) {
                case 'dashboard':
                  return <DashboardContent notaryId={notaryId} onNavigate={handleNavigate} />;
                case 'actualizarInfo':
                  return <ActualizarInformacion />;
                case 'generarInstrumento':
                  return <GenerarInstrumento onGoBack={() => handleNavigate('dashboard')} onInstrumentGenerated={handleInstrumentGenerated} />;
                case 'consultarInstrumentos':
                  return <ConsultarInstrumentos instruments={instruments} onGoBack={() => handleNavigate('dashboard')} />;
                case 'pagos':
                  return <Pagos />;
                default:
                  return <DashboardContent notaryId={notaryId} onNavigate={handleNavigate} />;
              }
            })()}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
