import { Powerup } from "src/app/powerups/models/powerup.model";

export class Concert{
    id!: number;
    title!: string;
    date!: Date;
    image!: string;
    location!: string;
    hasPassed!: Boolean;

    powerupId!: number;
    powerup!: Powerup;
}