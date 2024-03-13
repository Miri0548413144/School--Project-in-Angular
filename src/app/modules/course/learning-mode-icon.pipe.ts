import { Pipe, PipeTransform } from '@angular/core';
import { LearningMode } from './course.model';

@Pipe({
  name: 'learningModeIcon'
})
export class LearningModeIconPipe implements PipeTransform {
  transform(learningMode: string): string {
    switch (learningMode) {
      case "1":
        return "../../../../assets/icons/frontal.png";
      case "2":
        return "../../../../assets/icons/zoom.png";
      default:
        return '';
    }
  }
}

