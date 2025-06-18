'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calculator, FileText, CheckSquare, Scale, TrendingUp, Users, Clock, DollarSign } from 'lucide-react'
import { compararModalidades, SALARIOS_MINIMOS } from '@/lib/utils'

export default function Dashboard() {
  const [salarioDiario, setSalarioDiario] = useState(500)
  const [diasDiscontinuo, setDiasDiscontinuo] = useState(180)
  
  const comparacion = compararModalidades(salarioDiario, 365, 365, diasDiscontinuo)
  const ahorro = comparacion.indefinido.totalAnual - comparacion.discontinuo.totalAnual
  const porcentajeAhorro = ((ahorro / comparacion.indefinido.totalAnual) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Contratos Temporales Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Sistema de Análisis para Contratación de Choferes - México 2025
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Salario Mínimo 2025</p>
                <p className="font-semibold text-green-600">${SALARIOS_MINIMOS.GENERAL.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumen Ejecutivo */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <TrendingUp className="mr-3 h-6 w-6" />
                Resumen Ejecutivo
              </CardTitle>
              <CardDescription className="text-blue-100">
                Análisis comparativo de modalidades contractuales para choferes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">
                    ${ahorro.toLocaleString('es-MX')}
                  </div>
                  <p className="text-blue-100">Ahorro Anual Proyectado</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">
                    {porcentajeAhorro}%
                  </div>
                  <p className="text-blue-100">Reducción de Costos</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">
                    {diasDiscontinuo}
                  </div>
                  <p className="text-blue-100">Días de Operación</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="calculadora" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="calculadora" className="flex items-center">
              <Calculator className="mr-2 h-4 w-4" />
              Calculadora
            </TabsTrigger>
            <TabsTrigger value="comparador" className="flex items-center">
              <Scale className="mr-2 h-4 w-4" />
              Comparador
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              Checklist
            </TabsTrigger>
            <TabsTrigger value="referencias" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Referencias
            </TabsTrigger>
          </TabsList>

          {/* Calculadora de Costos */}
          <TabsContent value="calculadora" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculadora de Costos Laborales
                </CardTitle>
                <CardDescription>
                  Calcule y compare los costos de diferentes modalidades contractuales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Salario Diario (MXN)
                      </label>
                      <Input
                        type="number"
                        value={salarioDiario}
                        onChange={(e) => setSalarioDiario(Number(e.target.value))}
                        placeholder="Ingrese el salario diario"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Días Trabajados (Discontinuo)
                      </label>
                      <Input
                        type="number"
                        value={diasDiscontinuo}
                        onChange={(e) => setDiasDiscontinuo(Number(e.target.value))}
                        placeholder="Días de operación anual"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Parámetros Base 2025</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>• Salario Mínimo: ${SALARIOS_MINIMOS.GENERAL}</p>
                        <p>• UMA: $108.57</p>
                        <p>• Aguinaldo: 15 días mínimo</p>
                        <p>• Vacaciones: 6 días primer año</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resultados de la Calculadora */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Resultados del Análisis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-green-800">Indefinido Discontinuo</CardTitle>
                        <CardDescription className="text-green-600">Recomendado para operación estacional</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Salario Anual:</span>
                            <span className="font-medium">${comparacion.discontinuo.salarioAnual.toLocaleString('es-MX')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Cuotas IMSS:</span>
                            <span className="font-medium">${comparacion.discontinuo.cuotasIMSS.toLocaleString('es-MX')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Prestaciones:</span>
                            <span className="font-medium">${comparacion.discontinuo.totalPrestaciones.toLocaleString('es-MX')}</span>
                          </div>
                          <hr className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total Anual:</span>
                            <span className="text-green-700">${comparacion.discontinuo.totalAnual.toLocaleString('es-MX')}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Tiempo Determinado</CardTitle>
                        <CardDescription>Para proyectos específicos</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Salario Anual:</span>
                            <span className="font-medium">${comparacion.determinado.salarioAnual.toLocaleString('es-MX')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Cuotas IMSS:</span>
                            <span className="font-medium">${comparacion.determinado.cuotasIMSS.toLocaleString('es-MX')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Prestaciones:</span>
                            <span className="font-medium">${comparacion.determinado.totalPrestaciones.toLocaleString('es-MX')}</span>
                          </div>
                          <hr className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total Anual:</span>
                            <span>${comparacion.determinado.totalAnual.toLocaleString('es-MX')}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Indefinido Permanente</CardTitle>
                        <CardDescription>Referencia para comparación</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Salario Anual:</span>
                            <span className="font-medium">${comparacion.indefinido.salarioAnual.toLocaleString('es-MX')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Cuotas IMSS:</span>
                            <span className="font-medium">${comparacion.indefinido.cuotasIMSS.toLocaleString('es-MX')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Prestaciones:</span>
                            <span className="font-medium">${comparacion.indefinido.totalPrestaciones.toLocaleString('es-MX')}</span>
                          </div>
                          <hr className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total Anual:</span>
                            <span>${comparacion.indefinido.totalAnual.toLocaleString('es-MX')}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comparador Visual */}
          <TabsContent value="comparador" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="mr-2 h-5 w-5" />
                  Comparador de Modalidades Contractuales
                </CardTitle>
                <CardDescription>
                  Análisis detallado de ventajas y desventajas por modalidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Aspecto</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Indefinido Discontinuo</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Tiempo Determinado</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Indefinido Permanente</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Duración Máxima</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">Sin límite</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">1 año</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">Sin límite</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Flexibilidad Operativa</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-green-600">Alta</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-yellow-600">Media</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-red-600">Baja</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Costo Anual (Ejemplo)</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-green-600">${comparacion.discontinuo.totalAnual.toLocaleString('es-MX')}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">${comparacion.determinado.totalAnual.toLocaleString('es-MX')}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-red-600">${comparacion.indefinido.totalAnual.toLocaleString('es-MX')}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Riesgo de Conversión</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-green-600">Bajo</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-red-600">Alto</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">N/A</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Estabilidad del Trabajador</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-yellow-600">Media</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-red-600">Baja</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-green-600">Alta</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Biblioteca de Documentos */}
          <TabsContent value="documentos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Biblioteca de Documentos
                </CardTitle>
                <CardDescription>
                  Descargue contratos, formatos y documentos legales actualizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <FileText className="mr-2 h-5 w-5 text-blue-600" />
                        <h3 className="font-medium">Contrato Indefinido Discontinuo</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Modelo actualizado 2025 para choferes con operación estacional
                      </p>
                      <Button size="sm" className="w-full">
                        Descargar PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <FileText className="mr-2 h-5 w-5 text-green-600" />
                        <h3 className="font-medium">Contrato Tiempo Determinado</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Formato legal para proyectos específicos y sustituciones
                      </p>
                      <Button size="sm" className="w-full" variant="outline">
                        Descargar PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <Calculator className="mr-2 h-5 w-5 text-purple-600" />
                        <h3 className="font-medium">Calculadora Excel</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Herramienta automática para cálculos de costos laborales
                      </p>
                      <Button size="sm" className="w-full" variant="outline">
                        Descargar XLSX
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <Scale className="mr-2 h-5 w-5 text-orange-600" />
                        <h3 className="font-medium">Manual STPS</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Guía completa de procedimientos ante autoridades laborales
                      </p>
                      <Button size="sm" className="w-full" variant="outline">
                        Descargar PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <Users className="mr-2 h-5 w-5 text-red-600" />
                        <h3 className="font-medium">Análisis LFT</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Análisis detallado de artículos 35-40 de la Ley Federal del Trabajo
                      </p>
                      <Button size="sm" className="w-full" variant="outline">
                        Descargar PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <CheckSquare className="mr-2 h-5 w-5 text-teal-600" />
                        <h3 className="font-medium">Checklist Cumplimiento</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Lista de verificación para cumplimiento normativo
                      </p>
                      <Button size="sm" className="w-full" variant="outline">
                        Descargar PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Checklist de Cumplimiento */}
          <TabsContent value="checklist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckSquare className="mr-2 h-5 w-5" />
                  Checklist de Cumplimiento Normativo
                </CardTitle>
                <CardDescription>
                  Verifique el cumplimiento de todas las obligaciones legales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-800">Obligaciones IMSS</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Alta del trabajador en máximo 5 días hábiles</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Cálculo correcto del Salario Base de Cotización (SBC)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Pago oportuno de cuotas obrero-patronales</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Baja temporal correcta durante períodos de inactividad</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-800">Obligaciones STPS</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Contrato por escrito con todas las cláusulas obligatorias</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Justificación objetiva de la discontinuidad operacional</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Registro en REPSE (si aplica subcontratación)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Cumplimiento de normas de seguridad e higiene</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-800">Prestaciones Laborales</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Aguinaldo proporcional (mínimo 15 días)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Vacaciones proporcionales según antigüedad</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Prima vacacional (25% sobre vacaciones)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Constancia de trabajo al término del contrato</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-800">Sector Transporte</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Licencia federal vigente del chofer</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Capacitación para manejo de materiales peligrosos</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Seguro de responsabilidad civil</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Cumplimiento de jornadas máximas (14 horas)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referencias Legales */}
          <TabsContent value="referencias" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Referencias Legales y Contactos
                </CardTitle>
                <CardDescription>
                  Enlaces directos a fuentes oficiales y contactos de apoyo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Fuentes Oficiales</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-blue-800">STPS - Secretaría del Trabajo</h4>
                        <p className="text-sm text-gray-600">www.stps.gob.mx</p>
                        <p className="text-sm">Tel: 55-3000-2700</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-green-800">IMSS - Instituto Mexicano del Seguro Social</h4>
                        <p className="text-sm text-gray-600">www.imss.gob.mx</p>
                        <p className="text-sm">Tel: 800-623-2323</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-purple-800">SCT - Secretaría de Comunicaciones</h4>
                        <p className="text-sm text-gray-600">www.sct.gob.mx</p>
                        <p className="text-sm">Transporte federal</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Organizaciones del Sector</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-orange-800">CANACAR</h4>
                        <p className="text-sm text-gray-600">Cámara Nacional del Autotransporte de Carga</p>
                        <p className="text-sm">www.canacar.com.mx</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-red-800">ANPACT</h4>
                        <p className="text-sm text-gray-600">Asociación Nacional de Productores de Autobuses</p>
                        <p className="text-sm">www.anpact.com.mx</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-teal-800">PROFEDET</h4>
                        <p className="text-sm text-gray-600">Procuraduría Federal de la Defensa del Trabajo</p>
                        <p className="text-sm">Tel: 800-717-2942</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Marco Legal Actualizado</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium mb-2">Ley Federal del Trabajo</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Arts. 35-40: Modalidades contractuales</li>
                          <li>• Arts. 256-264: Trabajo de autotransporte</li>
                          <li>• Arts. 279-284: Trabajadores del campo</li>
                          <li>• Art. 39-F: Trabajo discontinuo</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Ley del Seguro Social</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Arts. 15-15A: Sujetos de aseguramiento</li>
                          <li>• Arts. 27-32: Cuotas y contribuciones</li>
                          <li>• Arts. 34-38: Salario base de cotización</li>
                          <li>• Arts. 41-47: Modalidades de aseguramiento</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              © 2025 Dashboard Contratos Temporales - Información actualizada según normativa mexicana vigente
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Última actualización: Enero 2025</span>
              <span>•</span>
              <span>Versión 1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
