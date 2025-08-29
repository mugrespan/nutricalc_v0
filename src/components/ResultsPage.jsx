import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download, RotateCcw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../App.css';

const ResultsPage = ({ parameters, onRestart }) => {
  // Determinar se é cultura única ou sistema de produção
  const isMultipleCrop = parameters?.cultura?.includes(' + ') || false;
  const crops = parameters?.cultura?.split(' + ') || ['SOJA'];
  
  const generateHTML = () => {
    const now = new Date();
    const dateTime = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`;
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparativo NutriCalc™</title>
    <style>
        :root {
            --nutri-green-primary: #13A538;
            --nutri-green-light: #4CAF50;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            color: #333;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: var(--nutri-green-primary);
            font-size: 2.5rem;
            margin: 0;
        }
        
        .header .subtitle {
            color: #666;
            margin-top: 10px;
        }
        
        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            overflow: hidden;
        }
        
        .card-header {
            padding: 20px;
            text-align: center;
            color: white;
            font-size: 1.25rem;
            font-weight: bold;
        }
        
        .card-content {
            padding: 20px;
        }
        
        .green-primary {
            background-color: var(--nutri-green-primary);
        }
        
        .green-light {
            background-color: var(--nutri-green-light);
        }
        
        .grid {
            display: grid;
            gap: 20px;
        }
        
        .grid-2 {
            grid-template-columns: 1fr 1fr;
        }
        
        .products {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #dee2e6;
        }
        
        .product-item {
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .metrics {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .metric {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            border: 1px solid #dee2e6;
        }
        
        .metric-value {
            font-weight: 600;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }
        
        th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: var(--nutri-green-primary);
        }
        
        .roi-card {
            background-color: var(--nutri-green-primary);
            color: white;
            text-align: center;
            padding: 40px 20px;
        }
        
        .roi-value {
            font-size: 3rem;
            font-weight: bold;
            margin-top: 10px;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            color: #666;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .grid-2 {
                grid-template-columns: 1fr;
            }
            
            .metrics {
                grid-template-columns: 1fr;
            }
        }
        
        @media print {
            body {
                background: white;
            }
            
            .card {
                box-shadow: none;
                border: 1px solid #ddd;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>NutriCalc™</h1>
            <div class="subtitle">Transformando nutrientes em valor</div>
            <div class="subtitle">Processamento: ${dateTime}</div>
        </div>
        
        <div class="card">
            <div class="card-header green-primary">
                MANEJO PADRÃO
            </div>
            <div class="card-content">
                <div class="grid grid-2">
                    <div>
                        <div class="products">
                            <div class="product-item">SSP</div>
                            <div class="product-item">KCl</div>
                        </div>
                    </div>
                    <div>
                        <div class="metrics">
                            <div class="metric">
                                <div class="metric-value">450 kg/ha</div>
                            </div>
                            <div class="metric">
                                <div class="metric-value">150 kg/ha</div>
                            </div>
                            <div class="metric">
                                <div>USD 283.07/ha</div>
                            </div>
                            <div class="metric">
                                <div>00:53:21</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header green-light">
                MANEJO OCP
            </div>
            <div class="card-content">
                <div class="grid grid-2">
                    <div>
                        <div class="products">
                            <div class="product-item">04-36-00-12S</div>
                            <div class="product-item">KCl</div>
                        </div>
                    </div>
                    <div>
                        <div class="metrics">
                            <div class="metric">
                                <div class="metric-value">250 kg/ha</div>
                            </div>
                            <div class="metric">
                                <div class="metric-value">150 kg/ha</div>
                            </div>
                            <div class="metric">
                                <div>USD 270.73/ha</div>
                            </div>
                            <div class="metric">
                                <div>00:43:33</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header" style="background: white; color: var(--nutri-green-primary);">
                COMPARAÇÃO
            </div>
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Atributo</th>
                            <th style="text-align: center;">Padrão</th>
                            <th style="text-align: center;">OCP</th>
                            <th style="text-align: center;">Δ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>N</td><td style="text-align: center;">0</td><td style="text-align: center;">10</td><td style="text-align: center;">10</td></tr>
                        <tr><td>P</td><td style="text-align: center;">90</td><td style="text-align: center;">90</td><td style="text-align: center;">0</td></tr>
                        <tr><td>K</td><td style="text-align: center;">90</td><td style="text-align: center;">90</td><td style="text-align: center;">0</td></tr>
                        <tr><td>S</td><td style="text-align: center;">49,5</td><td style="text-align: center;">30</td><td style="text-align: center;">-19,5</td></tr>
                        <tr><td>Tempo</td><td style="text-align: center;">00:53:21</td><td style="text-align: center;">00:43:33</td><td style="text-align: center;">-00:09:48</td></tr>
                        <tr><td>USD/ha</td><td style="text-align: center;">283.07</td><td style="text-align: center;">270.73</td><td style="text-align: center;">-12.34</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card">
            <div class="roi-card">
                <div style="font-size: 1.5rem; font-weight: 600;">ROI</div>
                <div class="roi-value">+6,4%</div>
            </div>
        </div>
        
        <div class="footer">
            Relatório gerado pelo NutriCalc™ © 2025 OCP Brasil
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comparativo-nutriCalc.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePDF = async () => {
    try {
      const element = document.getElementById('results-content');
      if (!element) {
        console.error('Elemento results-content não encontrado');
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      // Cabeçalho do PDF
      pdf.setFontSize(20);
      pdf.setTextColor(19, 165, 56); // #13A538
      pdf.text('NutriCalc™', 105, 20, { align: 'center' });
      pdf.setFontSize(12);
      pdf.setTextColor(0, 65, 42); // #00412A
      pdf.text('Transformando nutrientes em valor', 105, 30, { align: 'center' });
      
      // Data e hora
      const now = new Date();
      const dateTime = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`;
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Processamento: ${dateTime}`, 20, 40);
      
      // Conteúdo principal
      pdf.addImage(imgData, 'PNG', 0, 50, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Rodapé
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(119, 102, 89); // #776659
        pdf.text('Relatório gerado pelo NutriCalc™ © 2025 OCP Brasil', 105, 285, { align: 'center' });
      }
      
      pdf.save('comparativo-nutriCalc.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      // Fallback para HTML se o PDF falhar
      generateHTML();
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <img src="/LogoCor@2x.png" alt="OCP Logo" className="mx-auto h-24 w-auto mb-4" />
          <h1 className="text-3xl font-bold" style={{ color: 'var(--nutri-green-primary)' }}>
            NutriCalc™
          </h1>
        </div>

        <div id="results-content" className="space-y-6">
          {/* Título da 1ª Safra */}
          <div className="text-center">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--nutri-green-primary)' }}>
              1ª SAFRA - {crops[0]?.toUpperCase() || 'SOJA'}
            </h2>
          </div>

          {/* Manejo Padrão Fazenda */}
          <Card className="shadow-lg" style={{ backgroundColor: 'var(--nutri-green-primary)', color: 'white' }}>
            <CardHeader>
              <CardTitle className="text-center text-white text-xl">
                MANEJO PADRÃO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="bg-white text-black p-4.5 rounded">
                    <div className="font-semibold">SSP</div>
                    <div className="font-semibold">KCl</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="text-sm">450 kg/ha</div>
                    </div>
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="text-sm">150 kg/ha</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="font-semibold">USD 283.07/ha</div>
                    </div>
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="font-semibold">00:53:21</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manejo OCP */}
          <Card className="shadow-lg" style={{ backgroundColor: 'var(--nutri-green-light)', color: 'white' }}>
            <CardHeader>
              <CardTitle className="text-center text-white text-xl">
                MANEJO OCP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="bg-white text-black p-4.5 rounded">
                    <div className="font-semibold">04-36-00-12S</div>
                    <div className="font-semibold">KCl</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="text-sm">250 kg/ha</div>
                    </div>
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="text-sm">150 kg/ha</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="font-semibold">USD 270.73/ha</div>
                    </div>
                    <div className="bg-white text-black p-2 rounded text-center">
                      <div className="font-semibold">00:43:33</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segunda Safra - Apenas se for sistema de produção */}
          {isMultipleCrop && (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--nutri-green-primary)' }}>
                  2ª SAFRA - {crops[1]?.toUpperCase() || 'MILHO'}
                </h2>
              </div>

              {/* Manejo Padrão Fazenda - 2ª Safra */}
              <Card className="shadow-lg" style={{ backgroundColor: 'var(--nutri-green-primary)', color: 'white' }}>
                <CardHeader>
                  <CardTitle className="text-center text-white text-xl">
                    MANEJO PADRÃO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="bg-white text-black p-4.5 rounded">
                        <div className="font-semibold">KCl</div>
                        <div className="font-semibold">Uréia</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="text-sm">200 kg/ha</div>
                        </div>
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="text-sm">330 kg/ha</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="font-semibold">USD 228.10/ha</div>
                        </div>
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="font-semibold">00:06:40</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manejo OCP - 2ª Safra */}
              <Card className="shadow-lg" style={{ backgroundColor: 'var(--nutri-green-light)', color: 'white' }}>
                <CardHeader>
                  <CardTitle className="text-center text-white text-xl">
                    MANEJO OCP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="bg-white text-black p-4.5 rounded">
                        <div className="font-semibold">KCl</div>
                        <div className="font-semibold">Uréia</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="text-sm">200 kg/ha</div>
                        </div>
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="text-sm">330 kg/ha</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="font-semibold">USD 228.10/ha</div>
                        </div>
                        <div className="bg-white text-black p-2 rounded text-center">
                          <div className="font-semibold">00:06:40</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Comparação */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center" style={{ color: 'var(--nutri-green-primary)' }}>
                COMPARAÇÃO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: 'var(--nutri-green-primary)' }}>
                      <th className="p-2 text-left font-semibold">Atributo</th>
                      <th className="p-2 text-center font-semibold">Padrão</th>
                      <th className="p-2 text-center font-semibold">OCP</th>
                      <th className="p-2 text-center font-semibold">Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">N</td>
                      <td className="p-2 text-center">0</td>
                      <td className="p-2 text-center">10</td>
                      <td className="p-2 text-center">10</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">P</td>
                      <td className="p-2 text-center">90</td>
                      <td className="p-2 text-center">90</td>
                      <td className="p-2 text-center">0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">K</td>
                      <td className="p-2 text-center">90</td>
                      <td className="p-2 text-center">90</td>
                      <td className="p-2 text-center">0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">S</td>
                      <td className="p-2 text-center">49,5</td>
                      <td className="p-2 text-center">30</td>
                      <td className="p-2 text-center">-19,5</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Tempo</td>
                      <td className="p-2 text-center">00:53:21</td>
                      <td className="p-2 text-center">00:43:33</td>
                      <td className="p-2 text-center">-00:09:48</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">USD/ha</td>
                      <td className="p-2 text-center">283.07</td>
                      <td className="p-2 text-center">270.73</td>
                      <td className="p-2 text-center">-12.34</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* ROI */}
          <Card className="shadow-lg" style={{ backgroundColor: 'var(--nutri-green-primary)' }}>
            <CardContent className="text-center py-8">
              <div className="text-white">
                <div className="text-4xl font-semibold mb-2">ROI</div>
                <div className="text-4xl font-bold">+6,4%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={generatePDF}
            className="flex items-center gap-2 text-white font-semibold py-3 px-6"
            style={{ backgroundColor: 'var(--nutri-green-primary)' }}
          >
            <Download size={20} />
            Baixar
          </Button>
          <Button 
            onClick={onRestart}
            variant="outline"
            className="flex items-center gap-2 font-semibold py-3 px-6"
            style={{ borderColor: 'var(--nutri-green-primary)', color: 'var(--nutri-green-primary)' }}
          >
            <RotateCcw size={20} />
            Novo comparativo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

