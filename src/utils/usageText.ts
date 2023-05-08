export class usageText {
  about: string;
  usage: string;
  getFullUsage() {
    return this.getAbout() + this.getUsage();
  }
  getAbout() {
    return this.about;
  }
  getUsage() {
    var returnUsage = this.usage;
    // Need to insert unicode for < and >, otherwise they won't get displayed due to how template literals work
    returnUsage = returnUsage.replace(/</g, '&lt;');
    returnUsage = returnUsage.replace(/>/g, '&gt;');
    return returnUsage;
  }
}
