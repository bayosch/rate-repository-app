const createXmlBody = (ips) => {
  return '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\n' +
    '  <soap12:Body>\n' +
    '    <extraerContadores xmlns="http://tempuri.org/">\n' +
    '      <ips>'+JSON.stringify(ips)+'</ips>\n' +
    '    </extraerContadores>\n' +
    '  </soap12:Body>\n' +
    '</soap12:Envelope>';
};
export default createXmlBody;

