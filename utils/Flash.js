class Flash {
  constructor(req) {
    this.req = req;
    this.success = this.extractMessage("success");
    this.fail = this.extractMessage("fail");
  }

  extractMessage(name) {
    let message = this.req.flash(name);
    return message.length > 0 ? message[0] : false;
  }

  static getMessage(req) {
    let flash = new Flash(req);
    return {
      success: flash.success,
      fail: flash.fail,
      hasMessage: flash.hasMessage
    };
  }
}

module.exports=Flash;
