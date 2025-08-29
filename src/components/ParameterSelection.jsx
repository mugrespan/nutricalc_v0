import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import '../App.css';

const ParameterSelection = ({ onCompare }) => {
  const [parameters, setParameters] = useState({
    localidade: '',
    cultura: '',
    produtividadeEsperada: '',
    produtividadeEsperada2Safra: '',
    modalidadePlantio: '',
    fertilizantePlantio1Safra: '',
    dosePlantio1Safra: '',
    precoPlantio1Safra: '',
    fertilizanteCobertura1Safra: '',
    doseCobertura1Safra: '',
    precoCobertura1Safra: '',
    fertilizantePlantio2Safra: '',
    dosePlantio2Safra: '',
    precoPlantio2Safra: '',
    fertilizanteCobertura2Safra: '',
    doseCobertura2Safra: '',
    precoCobertura2Safra: '',
  });

  const localidades = [
    'Antonina', 'Araguari', 'Barra dos Coqueiros', 'Candeias', 'Catalão',
    'Imbituba', 'Maceió', 'Miritituba', 'Palmeirante', 'Paranaguá',
    'Recife', 'Rio Brilhante', 'Rio Grande', 'Rio Verde', 'Rondonópolis',
    'Salvador', 'Santarém', 'Santos', 'São Francisco do Sul', 'São Luis',
    'Sinop', 'Teresina', 'Uberaba', 'Vila do Conde', 'Vitória'
  ];

  const culturas = [
    'Algodão', 'Feijão', 'Milho', 'Soja',
    'Soja + Algodão', 'Soja + Milho', 'Soja + Trigo', 'Trigo'
  ];

  const modalidadesPlantio = [
    'Linha', 'Lanço'
  ];

  const fertilizantes = [
    'MAP', 'SSP', 'TSP', '02-20-20-04S'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parameters.localidade && parameters.cultura && parameters.produtividadeEsperada && parameters.modalidadePlantio) {
      onCompare(parameters);
    }
  };

  const updateParameter = (key, value) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const show2ndSafra = parameters.cultura.includes('+');

  return (
    <div className="min-h-screen p-4" 
         style={{ backgroundColor: 'white' }}>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold" 
                       style={{ color: 'var(--nutri-green-primary)' }}>
              Seleção de Parâmetros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="localidade">Localidade mais próxima</Label>
                <Select onValueChange={(value) => updateParameter('localidade', value)} value={parameters.localidade} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {localidades.map((localidade) => (
                      <SelectItem key={localidade} value={localidade}>
                        {localidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cultura">Cultura / Sistema de produção</Label>
                <Select onValueChange={(value) => updateParameter('cultura', value)} value={parameters.cultura} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {culturas.map((cultura) => (
                      <SelectItem key={cultura} value={cultura}>
                        {cultura}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="produtividadeEsperada">Produtividade esperada (sc/ha)</Label>
                <Input
                  id="produtividadeEsperada"
                  type="number"
                  value={parameters.produtividadeEsperada}
                  onChange={(e) => updateParameter('produtividadeEsperada', e.target.value)}
                  placeholder="Ex. 60"
                  required
                  className="w-full"
                />
              </div>

              {show2ndSafra && (
                <div className="space-y-2">
                  <Label htmlFor="produtividadeEsperada2Safra">Produtividade esperada da segunda safra (sc/ha)</Label>
                  <Input
                    id="produtividadeEsperada2Safra"
                    type="number"
                    value={parameters.produtividadeEsperada2Safra}
                    onChange={(e) => updateParameter('produtividadeEsperada2Safra', e.target.value)}
                    placeholder="Ex. 200"
                    required
                    className="w-full"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="modalidadePlantio">Modalidade de plantio</Label>
                <Select onValueChange={(value) => updateParameter('modalidadePlantio', value)} value={parameters.modalidadePlantio} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {modalidadesPlantio.map((modalidade) => (
                      <SelectItem key={modalidade} value={modalidade}>
                        {modalidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: 'var(--nutri-green-primary)' }}>1ª Safra</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fertilizantePlantio1Safra">Adubação de plantio</Label>
                  <Input
                    id="fertilizantePlantio1Safra"
                    type="text"
                    value={parameters.fertilizantePlantio1Safra}
                    onChange={(e) => updateParameter('fertilizantePlantio1Safra', e.target.value)}
                    placeholder="00-00-00-00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosePlantio1Safra">Dose (kg/ha)</Label>
                  <Input
                    id="dosePlantio1Safra"
                    type="number"
                    value={parameters.dosePlantio1Safra}
                    onChange={(e) => updateParameter('dosePlantio1Safra', e.target.value)}
                    placeholder="Ex. 300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precoPlantio1Safra">Preço (R$/t)</Label>
                  <Input
                    id="precoPlantio1Safra"
                    type="number"
                    value={parameters.precoPlantio1Safra}
                    onChange={(e) => updateParameter('precoPlantio1Safra', e.target.value)}
                    placeholder="Ex. 4000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fertilizanteCobertura1Safra">Adubação de cobertura</Label>
                  <Input
                    id="fertilizanteCobertura1Safra"
                    type="text"
                    value={parameters.fertilizanteCobertura1Safra}
                    onChange={(e) => updateParameter('fertilizanteCobertura1Safra', e.target.value)}
                    placeholder="00-00-00-00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doseCobertura1Safra">Dose (kg/ha)</Label>
                  <Input
                    id="doseCobertura1Safra"
                    type="number"
                    value={parameters.doseCobertura1Safra}
                    onChange={(e) => updateParameter('doseCobertura1Safra', e.target.value)}
                    placeholder="Ex. 300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precoCobertura1Safra">Preço (R$/t)</Label>
                  <Input
                    id="precoCobertura1Safra"
                    type="number"
                    value={parameters.precoCobertura1Safra}
                    onChange={(e) => updateParameter('precoCobertura1Safra', e.target.value)}
                    placeholder="Ex. 4000"
                  />
                </div>
              </div>

              {show2ndSafra && (
                <>
                  <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: 'var(--nutri-green-primary)' }}>2ª Safra</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fertilizantePlantio2Safra">Adubação de plantio</Label>
                      <Input
                        id="fertilizantePlantio2Safra"
                        type="text"
                        value={parameters.fertilizantePlantio2Safra}
                        onChange={(e) => updateParameter('fertilizantePlantio2Safra', e.target.value)}
                        placeholder="00-00-00-00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosePlantio2Safra">Dose (kg/ha)</Label>
                      <Input
                        id="dosePlantio2Safra"
                        type="number"
                        value={parameters.dosePlantio2Safra}
                        onChange={(e) => updateParameter('dosePlantio2Safra', e.target.value)}
                        placeholder="Ex. 300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="precoPlantio2Safra">Preço (R$/t)</Label>
                      <Input
                        id="precoPlantio2Safra"
                        type="number"
                        value={parameters.precoPlantio2Safra}
                        onChange={(e) => updateParameter('precoPlantio2Safra', e.target.value)}
                        placeholder="Ex. 4000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fertilizanteCobertura2Safra">Adubação de cobertura</Label>
                      <Input
                        id="fertilizanteCobertura2Safra"
                        type="text"
                        value={parameters.fertilizanteCobertura2Safra}
                        onChange={(e) => updateParameter('fertilizanteCobertura2Safra', e.target.value)}
                        placeholder="00-00-00-00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doseCobertura2Safra">Dose (kg/ha)</Label>
                      <Input
                        id="doseCobertura2Safra"
                        type="number"
                        value={parameters.doseCobertura2Safra}
                        onChange={(e) => updateParameter('doseCobertura2Safra', e.target.value)}
                        placeholder="Ex. 300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="precoCobertura2Safra">Preço (R$/t)</Label>
                      <Input
                        id="precoCobertura2Safra"
                        type="number"
                        value={parameters.precoCobertura2Safra}
                        onChange={(e) => updateParameter('precoCobertura2Safra', e.target.value)}
                        placeholder="Ex. 4000"
                      />
                    </div>
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full text-white font-semibold py-3 text-lg"
                style={{ backgroundColor: 'var(--nutri-green-primary)' }}
              >
                Comparar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParameterSelection;


