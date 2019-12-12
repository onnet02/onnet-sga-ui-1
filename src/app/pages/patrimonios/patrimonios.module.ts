import { ColabEquipamentoService } from './../../services/colaboradorEquipamento.service';
import { EquipamentoService } from './../../services/equipamento.service';
import { EmpresaService } from './../../services/empresa.service';
import { MarcaService } from './../../services/marca.service';
import { PatrimoniosRoutes } from './patrimonios.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { PatrimoniosComponent } from "./patrimonios.component";
import { RouterModule } from '@angular/router';
import { GerenciarModeloComponent } from './gerenciar-modelo/gerenciar-modelo.component';
import { GerenciarMarcasComponent } from './gerenciar-marcas/gerenciar-marcas.component';
import { GerenciarCelularComponent } from './gerenciar-celular/gerenciar-celular.component';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { ColorPickerModule } from 'ngx-color-picker';
import { ModeloService } from 'src/app/services/modelo.service';
import { SituacaoService } from 'src/app/services/situacao.service';
import { CelularService } from 'src/app/services/celular.service';
import { GerenciadorAlocaoMobileComponent } from './gerenciador-alocao-mobile/gerenciador-alocao-mobile.component';
import { MatStepperModule, MatHorizontalStepper, MatStepperNext } from '@angular/material/stepper';
import { MaterialModule } from 'src/app/angularMaterial/angular-material.module';
import { ColabCelularService } from 'src/app/services/colaboradorCelular.service';
import { HistoricoCelularComponent } from './historico-celular/historico-celular.component';
import { GerenciarEquipamentoComponent } from './gerenciar-equipamento/gerenciar-equipamento.component';
import { AlocarEquipamentoPageComponent } from './alocar-equipamento-page/alocar-equipamento-page.component';
import { EquipamentoHistoricoPageComponent } from './alocar-equipamento-page/equipamento-historico-page/equipamento-historico-page.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(PatrimoniosRoutes),

        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMaskModule,
        ColorPickerModule,
        MatCheckboxModule,
        FormsModule,
        MatStepperModule,
        MaterialModule,
    ],
    declarations: [
        PatrimoniosComponent,
        GerenciarModeloComponent,
        GerenciarMarcasComponent,
        GerenciarCelularComponent,
        GerenciadorAlocaoMobileComponent,
        HistoricoCelularComponent,
        GerenciarEquipamentoComponent,
        AlocarEquipamentoPageComponent,
        EquipamentoHistoricoPageComponent
    
    ],
    providers: [
        ModeloService,
        MarcaService,
        SituacaoService,
        CelularService,
        EmpresaService,
        ColabCelularService,
        EquipamentoService,
        ColabEquipamentoService
        
    ]
})

export class PatrimoniosModule {}