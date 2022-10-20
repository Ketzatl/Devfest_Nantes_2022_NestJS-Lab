import {Controller, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('health')
@ApiBearerAuth()
@Controller({ path: '/health', version: '1' })
export class HealthController {

    @Get()
    check(): string {
        return 'Everything is OK';
    }
}
