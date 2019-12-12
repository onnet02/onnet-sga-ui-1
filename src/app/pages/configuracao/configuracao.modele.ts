import { TicketStatusService } from './../../services/ticketStatus.service';
import { NgxMaskModule } from 'ngx-mask';
import { SituacaoService } from './../../services/situacao.service';
import { ChipService } from './../../services/gerenciarChip.service';
import { EmpresaService } from './../../services/empresa.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfiguracaoRoutes } from './configuracao.routing';
import { NgModule } from "@angular/core";
import { ConfiguracaoComponent } from './configuracao.component';
import { HttpClientModule } from '@angular/common/http';
import { GerenciarCargoComponent } from './gerenciar-cargo/gerenciar-cargo.component';
import { CargoService } from 'src/app/services/cargo.service';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { GerenciarEmpresaComponent } from './gerenciar-empresa/gerenciar-empresa.component';
import { GerenciarSetorComponent } from './gerenciar-setor/gerenciar-setor.component';
import { SetorService } from 'src/app/services/setor.service';
import { GerenciarMobileEmailComponent } from './gerenciar-mobile-email/gerenciar-mobile-email.component';
import { MobileEmailService } from 'src/app/services/mobileEmail.service';
import { GerenciarChipComponent } from './gerenciar-chip/gerenciar-chip.component';
import { GerenciarSituacaoComponent } from './gerenciar-situacao/gerenciar-situacao.component';
import { GerenciarTicketStatusComponent } from './gerenciar-ticket-status/gerenciar-ticket-status.component';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ConfiguracaoRoutes),
        ReactiveFormsModule,
        HttpClientModule,

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
        ColorPickerModule



    ],

    declarations: [
        ConfiguracaoComponent,
        GerenciarCargoComponent,
        GerenciarEmpresaComponent,
        GerenciarSetorComponent,
        GerenciarMobileEmailComponent,
        GerenciarChipComponent,
        GerenciarSituacaoComponent,
        GerenciarTicketStatusComponent
    ],

    providers : [
        CargoService,
        EmpresaService,
        SetorService,
        MobileEmailService,
        ChipService,
        SituacaoService,
        TicketStatusService
    ]
})

export class ConfiguracaoModule {}