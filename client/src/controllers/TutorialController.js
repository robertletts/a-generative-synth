import { tutorialData } from '../data/tutorialData.json';
/**
 * Handler for json data to be provided to and abstracted from the UI.
 */

export class TutorialController {
  constructor() {
    this.index = 0;
  }

  // Operation authentication on the data closure
  hasNext = () => this.index < tutorialData.length - 1;
  hasPrevious = () => this.index > 0;

  // Data management functionality
  next = () => tutorialData[++this.index];
  previous = () => tutorialData[--this.index];
  start = () => {
    this.index = 0;
    return tutorialData[this.index];
  };
}
