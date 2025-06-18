# FÓRMULAS EXCEL PARA CALCULADORA DE COSTOS CHOFERES

## Instrucciones de Implementación

Este archivo contiene todas las fórmulas necesarias para crear una calculadora automática de costos laborales en Excel.

---

## 1. PARÁMETROS GENERALES (Hoja: Parámetros)

```excel
# Celda B2: UMA 2025
=108.57

# Celda B3: Factor de Integración
=1.0877

# Celda B4: Días Promedio Mes
=30.4

# Celda B5: Salario Mínimo Zona General
=278.80

# Celda B6: Salario Mínimo ZLFN
=419.88
```

---

## 2. CUOTAS IMSS (Hoja: Cuotas)

```excel
# Cuotas Patronales (Columna B)
B2: =0.0054135    # Riesgos de Trabajo
B3: =0.204        # Enfermedades y Maternidad
B4: =0.0175       # Invalidez y Vida
B5: =0.01         # Guarderías
B6: =0.02         # Retiro
B7: =0.0315       # Cesantía hasta 1 UMA
B8: =0.03281      # Cesantía 1.01-4 UMA
B9: =0.03575      # Cesantía 4.01-7 UMA
B10: =0.0413      # Cesantía 7.01-10 UMA
B11: =0.04816     # Cesantía 10.01-15 UMA
B12: =0.06422     # Cesantía >15 UMA
B13: =0.05        # INFONAVIT

# Cuotas Trabajador (Columna C)
C2: =0            # Riesgos de Trabajo
C3: =0.004        # Enfermedades y Maternidad
C4: =0.00625      # Invalidez y Vida
C5: =0            # Guarderías
C6: =0            # Retiro
C7: =0.01125      # Cesantía (todas)
C13: =0           # INFONAVIT
```

---

## 3. CALCULADORA PRINCIPAL (Hoja: Calculadora)

### Celdas de Entrada (Variables del Usuario):
```excel
B2: [Salario Diario Base]
B3: [Días Trabajados por Año]
B4: [Modalidad: 1=Continuo, 2=Discontinuo, 3=Temporal, 4=Determinado]
B5: [Aplicar Convenio CANACAR: 1=Sí, 0=No]
```

### Cálculos Automáticos:

#### Salario Base de Cotización (SBC)
```excel
# Celda B7: SBC Normal
=IF(B5=1, 1511, B2*Parámetros.B3)

# Celda B8: Nivel UMA
=B7/Parámetros.B2
```

#### Determinación de Cesantía y Vejez
```excel
# Celda B9: Porcentaje Cesantía Patrón
=IF(B8<=1, Cuotas.B7,
   IF(B8<=4, Cuotas.B8,
      IF(B8<=7, Cuotas.B9,
         IF(B8<=10, Cuotas.B10,
            IF(B8<=15, Cuotas.B11, Cuotas.B12)))))

# Celda B10: Total Cuotas Patronales
=Cuotas.B2 + Cuotas.B3 + Cuotas.B4 + Cuotas.B5 + Cuotas.B6 + B9 + Cuotas.B13
```

#### Costos Mensuales IMSS
```excel
# Celda B12: IMSS Mensual
=B7 * B10 * Parámetros.B4

# Celda B13: IMSS Anual
=B12 * 12
```

#### Salarios y Prestaciones
```excel
# Celda B15: Salario Anual
=B2 * B3

# Celda B16: Aguinaldo Proporcional
=(B2 * B3 / 365) * 15

# Celda B17: Vacaciones Proporcionales
=(B2 * B3 / 365) * 6

# Celda B18: Prima Vacacional
=B17 * 0.25

# Celda B19: Total Prestaciones
=B16 + B17 + B18
```

#### Costos Adicionales por Modalidad
```excel
# Celda B21: Provisión Pasivos Laborales
=IF(B4=1, B15*0.05,
   IF(B4=2, B15*0.02,
      IF(B4=3, B15*0.03, B15*0.08)))

# Celda B22: Factor de Rotación
=IF(B4=4, 1.2, IF(B4=3, 1.1, 1))

# Celda B23: Costos de Capacitación
=IF(B3<365, 7500*B22, 7500)

# Celda B24: Costos de Rotación
=IF(B4=4, 11000, IF(B4=3, 5500, 0))
```

#### Costo Total
```excel
# Celda B26: Costo Total Anual
=B15 + B19 + B13 + B21 + B23 + B24

# Celda B27: Costo por Día Trabajado
=B26 / B3

# Celda B28: Costo por Día Calendario
=B26 / 365
```

---

## 4. TABLA COMPARATIVA (Hoja: Comparativa)

### Configuración de Comparación Automática:
```excel
# Fila 3: Modalidades
A3: Indefinido Continuo
B3: Indefinido Discontinuo
C3: Por Temporada
D3: Determinado

# Fila 4: Cálculos para Perfil A ($400 diarios, 365 días)
A4: =CALCULATE_COST(400, 365, 1, 0)
B4: =CALCULATE_COST(400, 183, 2, 0)
C4: =CALCULATE_COST(400, 183, 3, 0) * 2
D4: =CALCULATE_COST(400, 365, 4, 0)

# Función CALCULATE_COST (Crear como función personalizada)
=Calculadora.B26 # Con parámetros dinámicos
```

### Análisis de Ahorros:
```excel
# Columna E: Ahorro vs Indefinido Continuo
E4: =A4-B4  # Ahorro Discontinuo
E5: =A4-C4  # Ahorro Temporal
E6: =A4-D4  # Ahorro Determinado

# Columna F: Porcentaje de Ahorro
F4: =(A4-B4)/A4*100
F5: =(A4-C4)/A4*100
F6: =(A4-D4)/A4*100
```

---

## 5. SIMULADOR DE DÍAS (Hoja: Simulador)

### Tabla de Días Variables:
```excel
# Columna A: Días trabajados
A3: 365
A4: 300
A5: 250
A6: 200
A7: 150
A8: 120
A9: 90
A10: 60

# Columna B: Costo Indefinido (siempre 365 días)
B3: =CALCULATE_COST(550, 365, 1, 0)
B4: =B3  # Se copia hacia abajo

# Columna C: Costo Discontinuo (días variables)
C3: =CALCULATE_COST(550, A3, 2, 0)
C4: =CALCULATE_COST(550, A4, 2, 0)
# Continuar patrón...

# Columna D: Ahorro Absoluto
D3: =B3-C3
D4: =B4-C4

# Columna E: Ahorro Porcentual
E3: =(B3-C3)/B3*100
E4: =(B4-C4)/B4*100
```

---

## 6. ANÁLISIS DE SENSIBILIDAD (Hoja: Sensibilidad)

### Variación Salarial:
```excel
# Tabla de Incrementos Salariales
# Fila 2: Headers
A2: Base
B2: +5%
C2: +10%
D2: +15%
E2: +20%

# Fila 3: Salarios
A3: =550
B3: =A3*1.05
C3: =A3*1.1
D3: =A3*1.15
E3: =A3*1.2

# Fila 4: Costos
A4: =CALCULATE_COST(A3, 365, 1, 0)
B4: =CALCULATE_COST(B3, 365, 1, 0)
C4: =CALCULATE_COST(C3, 365, 1, 0)
D4: =CALCULATE_COST(D3, 365, 1, 0)
E4: =CALCULATE_COST(E3, 365, 1, 0)
```

### Variación de Cuotas IMSS:
```excel
# Impacto de incremento en cuotas
# Celda B10: Modificar fórmula para incluir factor de ajuste
=SUMPRODUCT(Cuotas.B2:B13) * (1 + B$1)  # B1 contiene % incremento
```

---

## 7. PROYECCIÓN QUINQUENAL (Hoja: Proyección)

### Tabla de Proyección:
```excel
# Headers (Fila 1)
A1: Año
B1: Indefinido
C1: Discontinuo
D1: Ahorro Anual
E1: Ahorro Acumulado

# Datos (Filas 2-6)
A2: 2025
A3: 2026
A4: 2027
A5: 2028
A6: 2029

# Cálculos con incremento 8% anual
B2: =CALCULATE_COST(550, 365, 1, 0) * 10  # 10 choferes
B3: =B2*1.08
B4: =B3*1.08
B5: =B4*1.08
B6: =B5*1.08

C2: =CALCULATE_COST(550, 183, 2, 0) * 10
C3: =C2*1.08
C4: =C3*1.08
C5: =C4*1.08
C6: =C5*1.08

D2: =B2-C2
D3: =B3-C3
D4: =B4-C4
D5: =B5-C5
D6: =B6-C6

E2: =D2
E3: =E2+D3
E4: =E3+D4
E5: =E4+D5
E6: =E5+D6
```

---

## 8. DASHBOARD PRINCIPAL (Hoja: Dashboard)

### Controles Principales:
```excel
# Celdas de Input
B2: Salario Diario
B3: Días Trabajados
B4: Modalidad (Lista desplegable)
B5: Convenio CANACAR (Checkbox)

# Resultados Principales
B8: =Calculadora.B26  # Costo Total
B9: =Calculadora.B27  # Costo por Día
B10: =Calculadora.B28 # Costo Diario Calendario

# Comparación Rápida
B13: =Comparativa.A4  # Indefinido Continuo
B14: =Comparativa.B4  # Indefinido Discontinuo
B15: =Comparativa.E4  # Ahorro
B16: =Comparativa.F4  # % Ahorro
```

### Gráficos Recomendados:
1. **Gráfico de Barras**: Comparación de costos por modalidad
2. **Gráfico de Líneas**: Sensibilidad a días trabajados
3. **Gráfico Circular**: Distribución de costos
4. **Gráfico de Área**: Proyección quinquenal de ahorros

---

## 9. VALIDACIONES Y CONTROLES

### Validación de Datos:
```excel
# Validar Salario Diario (B2)
=IF(B2<Parámetros.B5, "ADVERTENCIA: Salario menor al mínimo", "OK")

# Validar Días Trabajados (B3)
=IF(B3>365, "ERROR: Días no pueden exceder 365", 
   IF(B3<1, "ERROR: Debe ser mayor a 0", "OK"))

# Validar Modalidad (B4)
=IF(OR(B4<1, B4>4), "ERROR: Modalidad inválida", "OK")
```

### Alertas Automáticas:
```excel
# Alerta Convenio CANACAR
=IF(AND(B5=1, B2<725), "NOTA: Convenio CANACAR requiere SBC mínimo $725", "")

# Alerta Días Discontinuo
=IF(AND(B4=2, B3>250), "RECOMENDACIÓN: Considerar indefinido continuo", "")
```

---

## 10. FUNCIONES AUXILIARES (Módulo VBA)

```vba
Function CALCULATE_COST(salario As Double, dias As Integer, modalidad As Integer, canacar As Integer) As Double
    ' Función personalizada para cálculo de costos
    Dim sbc As Double
    Dim factor_integracion As Double
    Dim cuotas_imss As Double
    Dim prestaciones As Double
    Dim provisiones As Double
    
    factor_integracion = 1.0877
    
    If canacar = 1 Then
        sbc = 1511
    Else
        sbc = salario * factor_integracion
    End If
    
    ' Determinar cuotas según nivel UMA
    Dim nivel_uma As Double
    nivel_uma = sbc / 108.57
    
    Dim cesantia_patron As Double
    If nivel_uma <= 1 Then
        cesantia_patron = 0.0315
    ElseIf nivel_uma <= 4 Then
        cesantia_patron = 0.03281
    ElseIf nivel_uma <= 7 Then
        cesantia_patron = 0.03575
    ElseIf nivel_uma <= 10 Then
        cesantia_patron = 0.0413
    ElseIf nivel_uma <= 15 Then
        cesantia_patron = 0.04816
    Else
        cesantia_patron = 0.06422
    End If
    
    ' Calcular cuotas IMSS
    Dim total_cuotas As Double
    total_cuotas = 0.0054135 + 0.204 + 0.0175 + 0.01 + 0.02 + cesantia_patron + 0.05
    
    cuotas_imss = sbc * total_cuotas * 30.4 * 12
    
    ' Calcular prestaciones proporcionales
    prestaciones = (salario * dias / 365) * (15 + 6 + 6 * 0.25)
    
    ' Provisiones según modalidad
    Select Case modalidad
        Case 1: provisiones = salario * dias * 0.05
        Case 2: provisiones = salario * dias * 0.02
        Case 3: provisiones = salario * dias * 0.03
        Case 4: provisiones = salario * dias * 0.08
    End Select
    
    CALCULATE_COST = (salario * dias) + prestaciones + cuotas_imss + provisiones
End Function
```

---

## INSTRUCCIONES DE USO

1. **Crear archivo Excel** con las hojas mencionadas
2. **Importar datos** del archivo CSV
3. **Implementar fórmulas** según las secciones anteriores
4. **Crear función VBA** CALCULATE_COST
5. **Configurar validaciones** y controles
6. **Diseñar dashboard** con gráficos
7. **Probar calculadora** con diferentes escenarios

La calculadora estará lista para simular cualquier combinación de variables y proporcionar análisis financiero inmediato.