# DIAGRAMAS DE FLUJO - PROCESOS OPERATIVOS
## ALTA/BAJA REPETITIVA DE TRABAJADORES TEMPORALES

### VERSIÓN 1.0 | JUNIO 2025

---

## ÍNDICE DE DIAGRAMAS

1. [FLUJO GENERAL DEL PROCESO](#flujo-general-del-proceso)
2. [PROCESO DE PLANIFICACIÓN](#proceso-de-planificación)
3. [PROCESO DE ALTA IMSS](#proceso-de-alta-imss)
4. [PROCESO DE SEGUIMIENTO](#proceso-de-seguimiento)
5. [PROCESO DE BAJA IMSS](#proceso-de-baja-imss)
6. [MANEJO DE EXCEPCIONES](#manejo-de-excepciones)
7. [FLUJO DE COMUNICACIONES](#flujo-de-comunicaciones)

---

## FLUJO GENERAL DEL PROCESO

```mermaid
graph TD
    A[INICIO - Detección Necesidad Personal] --> B{¿Hay demanda operativa?}
    B -->|Sí| C[Planificación T-30 días]
    B -->|No| Z[FIN - Sin acción]
    
    C --> D[Selección Personal T-21 días]
    D --> E[Preparación Documental T-14 días]
    E --> F[Ejecución Alta IMSS T-0]
    
    F --> G[Comunicación al Trabajador]
    G --> H[Integración Operativa T+1]
    H --> I[Seguimiento Diario]
    
    I --> J{¿Continúa período?}
    J -->|Sí| I
    J -->|No| K[Proceso de Baja]
    
    K --> L[Baja IMSS]
    L --> M[Comunicación de Baja]
    M --> N[Proceso Finiquito]
    N --> O[Archivo Documentación]
    O --> P[FIN - Ciclo Completo]
    
    style A fill:#e1f5fe
    style P fill:#e8f5e8
    style F fill:#fff3e0
    style L fill:#fff3e0
```

---

## PROCESO DE PLANIFICACIÓN

```mermaid
graph TD
    A[INICIO - Análisis Demanda] --> B[Revisar Proyección Operativa]
    B --> C[Calcular Necesidades Personal]
    C --> D{¿Suficiente personal en BD?}
    
    D -->|Sí| E[Seleccionar Candidatos]
    D -->|No| F[Iniciar Reclutamiento]
    
    F --> G[Publicar Vacantes]
    G --> H[Recibir Aplicaciones]
    H --> I[Proceso de Selección]
    I --> J[Actualizar Base de Datos]
    J --> E
    
    E --> K[Verificar Disponibilidad]
    K --> L{¿Candidatos disponibles?}
    
    L -->|Sí| M[Confirmar Participación]
    L -->|No| N[Buscar Alternativas]
    N --> K
    
    M --> O[Programar Fechas Alta]
    O --> P[Generar Cronograma]
    P --> Q[Notificar a Departamentos]
    Q --> R[FIN - Plan Definido]
    
    style A fill:#e1f5fe
    style R fill:#e8f5e8
    style D fill:#fff9c4
    style L fill:#fff9c4
```

---

## PROCESO DE ALTA IMSS

```mermaid
graph TD
    A[INICIO - Fecha Programada Alta] --> B[Verificar Expediente]
    B --> C{¿Documentación completa?}
    
    C -->|No| D[Solicitar Documentos Faltantes]
    D --> E{¿Documentos recibidos?}
    E -->|No| F[Escalar a Supervisor]
    E -->|Sí| G[Actualizar Expediente]
    F --> G
    G --> C
    
    C -->|Sí| H[Acceder Sistema IMSS IDSE]
    H --> I[Capturar Datos Trabajador]
    I --> J[Verificar Información]
    J --> K{¿Datos correctos?}
    
    K -->|No| L[Corregir Información]
    L --> I
    
    K -->|Sí| M[Enviar Alta a IMSS]
    M --> N{¿Alta exitosa?}
    
    N -->|No| O[Revisar Error]
    O --> P{¿Error corregible?}
    P -->|Sí| L
    P -->|No| Q[Escalar a Mesa de Ayuda IMSS]
    Q --> R[Esperar Resolución]
    R --> M
    
    N -->|Sí| S[Generar Comprobante]
    S --> T[Actualizar Sistema Interno]
    T --> U[Notificar a Nómina]
    U --> V[Archivar Documentación]
    V --> W[Enviar Comunicación Trabajador]
    W --> X[FIN - Alta Completada]
    
    style A fill:#e1f5fe
    style X fill:#e8f5e8
    style C fill:#fff9c4
    style K fill:#fff9c4
    style N fill:#fff9c4
    style P fill:#fff9c4
```

---

## PROCESO DE SEGUIMIENTO

```mermaid
graph TD
    A[INICIO - Trabajador Activo] --> B[Verificación Asistencia Diaria]
    B --> C{¿Asistió?}
    
    C -->|Sí| D[Registrar Asistencia]
    C -->|No| E[Verificar Justificación]
    
    E --> F{¿Falta justificada?}
    F -->|Sí| G[Registrar Falta Justificada]
    F -->|No| H[Registrar Falta Injustificada]
    
    H --> I{¿> 3 faltas consecutivas?}
    I -->|Sí| J[Iniciar Proceso Baja por Abandono]
    I -->|No| K[Contactar Trabajador]
    
    K --> L{¿Responde positivamente?}
    L -->|Sí| M[Continuar Seguimiento]
    L -->|No| N[Marcar como Problemático]
    
    D --> O[Actualizar Dashboard]
    G --> O
    N --> O
    M --> O
    
    O --> P[Generar Alertas Automáticas]
    P --> Q{¿Fin de período?}
    
    Q -->|No| R[Continuar Seguimiento Diario]
    R --> B
    Q -->|Sí| S[Iniciar Proceso Baja]
    
    J --> T[FIN - Baja por Abandono]
    S --> U[FIN - Baja Programada]
    
    style A fill:#e1f5fe
    style T fill:#ffebee
    style U fill:#e8f5e8
    style C fill:#fff9c4
    style F fill:#fff9c4
    style I fill:#fff9c4
    style L fill:#fff9c4
    style Q fill:#fff9c4
```

---

## PROCESO DE BAJA IMSS

```mermaid
graph TD
    A[INICIO - Trigger Baja] --> B{¿Tipo de baja?}
    
    B -->|Fin Contrato| C[Verificar Fecha Contractual]
    B -->|Renuncia| D[Recibir Carta Renuncia]
    B -->|Despido| E[Documentar Causa]
    B -->|Abandono| F[Verificar Faltas Consecutivas]
    
    C --> G[Confirmar Último Día Laboral]
    D --> G
    E --> G
    F --> G
    
    G --> H[Notificar a Supervisor Operativo]
    H --> I[Recuperar Equipos/Materiales]
    I --> J[Calcular Días Trabajados]
    J --> K[Acceder Sistema IMSS IDSE]
    
    K --> L[Generar Baja Trabajador]
    L --> M{¿Baja exitosa?}
    
    M -->|No| N[Revisar Error]
    N --> O{¿Error corregible?}
    O -->|Sí| P[Corregir Datos]
    P --> L
    O -->|No| Q[Contactar Mesa Ayuda IMSS]
    Q --> R[Esperar Resolución]
    R --> L
    
    M -->|Sí| S[Generar Comprobante Baja]
    S --> T[Actualizar Sistema Interno]
    T --> U[Notificar a Nómina para Finiquito]
    U --> V[Enviar Comunicación Trabajador]
    V --> W[Programar Entrega Finiquito]
    W --> X[Archivar Documentación]
    X --> Y[FIN - Baja Completada]
    
    style A fill:#e1f5fe
    style Y fill:#e8f5e8
    style B fill:#fff9c4
    style M fill:#fff9c4
    style O fill:#fff9c4
```

---

## MANEJO DE EXCEPCIONES

```mermaid
graph TD
    A[DETECCIÓN EXCEPCIÓN] --> B{¿Tipo de excepción?}
    
    B -->|Error Sistema IMSS| C[Verificar Conectividad]
    B -->|Documentación Incompleta| D[Identificar Documentos Faltantes]
    B -->|Trabajador No Localizable| E[Intentar Contactos Alternativos]
    B -->|Error en Datos| F[Identificar Campo Erróneo]
    
    C --> G{¿Sistema operativo?}
    G -->|No| H[Esperar Restablecimiento]
    G -->|Sí| I[Verificar Credenciales]
    H --> J[Monitoreo Cada 30 min]
    J --> G
    I --> K[Reintentar Proceso]
    
    D --> L[Contactar Trabajador]
    L --> M{¿Documentos disponibles?}
    M -->|Sí| N[Solicitar Envío Inmediato]
    M -->|No| O[Extender Plazo/Buscar Alternativas]
    
    E --> P{¿Contacto exitoso?}
    P -->|Sí| Q[Confirmar Status]
    P -->|No| R[Marcar como No Localizable]
    
    F --> S[Solicitar Corrección]
    S --> T[Verificar Fuente Información]
    T --> U[Actualizar Base Datos]
    
    K --> V{¿Proceso exitoso?}
    N --> V
    O --> V
    Q --> V
    R --> W[Documentar Caso]
    U --> V
    
    V -->|Sí| X[Continuar Flujo Normal]
    V -->|No| Y[Escalar a Supervisor]
    
    W --> Z[Archivar como Excepción]
    Y --> AA[Análisis Caso Especial]
    AA --> BB[Definir Acción Correctiva]
    BB --> CC[Implementar Solución]
    CC --> DD[Documentar Aprendizaje]
    
    X --> EE[FIN - Excepción Resuelta]
    Z --> FF[FIN - Caso Archivado]
    DD --> GG[FIN - Mejora Implementada]
    
    style A fill:#fff3e0
    style EE fill:#e8f5e8
    style FF fill:#ffebee
    style GG fill:#e3f2fd
```

---

## FLUJO DE COMUNICACIONES

```mermaid
graph TD
    A[EVENTO TRIGGER] --> B{¿Tipo de comunicación?}
    
    B -->|Pre-notificación Alta| C[Preparar Mensaje Alta]
    B -->|Confirmación Alta| D[Preparar Confirmación IMSS]
    B -->|Recordatorio Inicio| E[Preparar Recordatorio]
    B -->|Notificación Baja| F[Preparar Mensaje Baja]
    B -->|Información Finiquito| G[Preparar Info Finiquito]
    
    C --> H[Seleccionar Template]
    D --> H
    E --> H
    F --> H
    G --> H
    
    H --> I[Personalizar Mensaje]
    I --> J[Validar Datos Trabajador]
    J --> K{¿Datos correctos?}
    
    K -->|No| L[Actualizar Información]
    L --> J
    
    K -->|Sí| M[Seleccionar Canal Comunicación]
    M --> N{¿Preferencia trabajador?}
    
    N -->|WhatsApp| O[Enviar WhatsApp]
    N -->|SMS| P[Enviar SMS]
    N -->|Email| Q[Enviar Email]
    N -->|Llamada| R[Realizar Llamada]
    
    O --> S[Verificar Entrega]
    P --> S
    Q --> S
    R --> T[Documentar Llamada]
    T --> S
    
    S --> U{¿Mensaje entregado?}
    U -->|Sí| V[Registrar Confirmación]
    U -->|No| W[Intentar Canal Alternativo]
    W --> X{¿Segundo intento exitoso?}
    
    X -->|Sí| V
    X -->|No| Y[Marcar como No Contactado]
    
    V --> Z[Actualizar Dashboard]
    Y --> AA[Generar Alerta Manual]
    
    Z --> BB[FIN - Comunicación Exitosa]
    AA --> CC[FIN - Requiere Seguimiento Manual]
    
    style A fill:#e1f5fe
    style BB fill:#e8f5e8
    style CC fill:#fff3e0
    style K fill:#fff9c4
    style U fill:#fff9c4
    style X fill:#fff9c4
```

---

## LEYENDA DE SÍMBOLOS

### SÍMBOLOS UTILIZADOS
- **Rectángulo**: Proceso o actividad
- **Rombo**: Decisión o punto de control
- **Círculo**: Inicio o fin de proceso
- **Paralelogramo**: Entrada o salida de datos

### COLORES DE ESTADO
- **Azul claro** (`#e1f5fe`): Inicio de proceso
- **Verde claro** (`#e8f5e8`): Fin exitoso
- **Naranja claro** (`#fff3e0`): Proceso crítico/importante
- **Amarillo claro** (`#fff9c4`): Punto de decisión
- **Rojo claro** (`#ffebee`): Error o problema
- **Azul gris** (`#e3f2fd`): Mejora o aprendizaje

---

## TIEMPOS ESTIMADOS POR PROCESO

| Proceso | Tiempo Promedio | Tiempo Máximo | Recursos Necesarios |
|---------|----------------|---------------|-------------------|
| Planificación completa | 2-4 horas | 8 horas | Jefe Operaciones + RH |
| Alta individual IMSS | 15 minutos | 30 minutos | Coordinador RH |
| Seguimiento diario | 30 minutos | 1 hora | Auxiliar RH |
| Baja individual IMSS | 10 minutos | 20 minutos | Coordinador RH |
| Manejo excepción promedio | 45 minutos | 2 horas | Coordinador + Supervisor |
| Comunicación por trabajador | 5 minutos | 15 minutos | Auxiliar RH |

---

## PUNTOS DE CONTROL CRÍTICOS

### VALIDACIONES OBLIGATORIAS
1. **Verificación documentación** antes de alta IMSS
2. **Confirmación fechas contractuales** vs sistema
3. **Validación datos trabajador** antes de envío
4. **Comprobación entrega comunicaciones** críticas
5. **Verificación baja exitosa** en sistema IMSS

### ALERTAS AUTOMÁTICAS REQUERIDAS
- Documentación incompleta (24 horas antes de alta)
- Fallas en sistema IMSS (tiempo real)
- Trabajador no localizable (48 horas)
- Vencimiento plazos legales (24 horas antes)
- Errores en datos críticos (inmediato)

---

## INTEGRACIÓN CON SISTEMAS

### SISTEMAS PRINCIPALES
- **IMSS IDSE/SUA**: Altas y bajas oficiales
- **Sistema Nómina**: Integración para pagos
- **Control Asistencia**: Seguimiento diario
- **Base Datos RH**: Información trabajadores
- **Dashboard Control**: Monitoreo en tiempo real

### FLUJO DE DATOS
```
Planificación → Base Datos RH → Sistema IMSS → Nómina → Dashboard
     ↓              ↓              ↓           ↓         ↓
Reportes ← Archivo Digital ← Comprobantes ← Alertas ← KPIs
```

---

*Documento técnico - Versión 1.0*  
*Actualización: Junio 2025*  
*Próxima revisión: Diciembre 2025*