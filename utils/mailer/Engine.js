const request = require('request');
const nodemailer = require('nodemailer');
// require('dotenv').config()

exports.Logo = 'https://freshfruitcreamery.com/assets/images/logo.png';

exports.TermiiMailProvider = (data) => {
  // console.log(process.env.TERMII_API_KEY)
  const options = {
    method: 'POST',
    url: process.env.TERMII_API_ENDPOINT,
    headers: {
      'Content-Type': ['application/json', 'application/json'],
    },
    body: JSON.stringify(data),
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};

exports.Mailer = async (template, data) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAILER_USER, // sender address
    to: data.email, // list of receivers
    subject: data.subject, // Subject line
    html: template, // html body
  });

  return info;
};

exports.mailer_stylesheet = () => {
  const stylesheet = `

        <style type="text/css" id="media-query">
            
            body, p, h1, h2, h3, h4, ol, li, ul, div {
                margin: 0;
                padding: 0;
                font-family: "Poppins", sans-serif !important;
                color: black;
            }
            .flex{
                display: flex;
            }

            table, tr, td {
                vertical-align: top;
                border-collapse: collapse; }

            .ie-browser table, .mso-container table {
                table-layout: fixed; }

            * {
                line-height: inherit; }

            .card {
                position: relative;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                min-width: 0;
                word-wrap: break-word;
                background-color: #fff;
                background-clip: border-box;
                border: 1px solid rgba(0, 0, 0, 0.125);
                border-radius: 0.25rem;
            }

            .card > hr {
                margin-right: 0;
                margin-left: 0;
            }

            .card > .list-group:first-child .list-group-item:first-child {
                border-top-left-radius: 0.25rem;
                border-top-right-radius: 0.25rem;
            }

            .card > .list-group:last-child .list-group-item:last-child {
                border-bottom-right-radius: 0.25rem;
                border-bottom-left-radius: 0.25rem;
            }

            .card-body {
                -webkit-box-flex: 1;
                -ms-flex: 1 1 auto;
                flex: 1 1 auto;
                padding: 1.25rem;
            }

            .card-title {
                margin-bottom: 0.75rem;
            }

            .card-subtitle {
                margin-top: -0.375rem;
                margin-bottom: 0;
            }

            .card-text:last-child {
                margin-bottom: 0;
            }

            .card-link:hover {
                text-decoration: none;
            }

            .card-link + .card-link {
                margin-left: 1.25rem;
            }

            .card-header {
                padding: 0.75rem 1.25rem;
                margin-bottom: 0;
                background-color: rgba(0, 0, 0, 0.03);
                border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            }

            .card-header:first-child {
                border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
            }

            .card-header + .list-group .list-group-item:first-child {
                border-top: 0;
            }

            .card-footer {
                padding: 0.75rem 1.25rem;
                background-color: rgba(0, 0, 0, 0.03);
                border-top: 1px solid rgba(0, 0, 0, 0.125);
            }

            .card-footer:last-child {
                border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
            }

            a[x-apple-data-detectors=true] {
            color: inherit !important;
            text-decoration: none !important; }

            [owa] .img-container div, [owa] .img-container button {
            display: block !important; }

            [owa] .fullwidth button {
            width: 100% !important; }

            [owa] .block-grid .col {
            display: table-cell;
            float: none !important;
            vertical-align: top; }

            .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
            width: 620px !important; }

            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%; }

            .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
            width: 204px !important; }

            .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
            width: 408px !important; }

            .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
            width: 310px !important; }

            .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
            width: 206px !important; }

            .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
            width: 155px !important; }

            .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
            width: 124px !important; }

            .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
            width: 103px !important; }

            .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
            width: 88px !important; }

            .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
            width: 77px !important; }

            .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
            width: 68px !important; }

            .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
            width: 62px !important; }

            .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
            width: 56px !important; }

            .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
            width: 51px !important; }

            @media only screen and (min-width: 640px) {
            .block-grid {
                width: 620px !important; }
            .block-grid .col {
                vertical-align: top; }
            .block-grid .col.num12 {
                width: 620px !important; }
            .block-grid.mixed-two-up .col.num4 {
                width: 204px !important; }
            .block-grid.mixed-two-up .col.num8 {
                width: 408px !important; }
            .block-grid.two-up .col {
                width: 310px !important; }
            .block-grid.three-up .col {
                width: 206px !important; }
            .block-grid.four-up .col {
                width: 155px !important; }
            .block-grid.five-up .col {
                width: 124px !important; }
            .block-grid.six-up .col {
                width: 103px !important; }
            .block-grid.seven-up .col {
                width: 88px !important; }
            .block-grid.eight-up .col {
                width: 77px !important; }
            .block-grid.nine-up .col {
                width: 68px !important; }
            .block-grid.ten-up .col {
                width: 62px !important; }
            .block-grid.eleven-up .col {
                width: 56px !important; }
            .block-grid.twelve-up .col {
                width: 51px !important; } }

            @media (max-width: 640px) {
            .block-grid, .col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important; }
            .block-grid {
                width: calc(100% - 40px) !important; }
            .col {
                width: 100% !important; }
            .col > div {
                margin: 0 auto; }
            img.fullwidth, img.fullwidthOnMobile {
                max-width: 100% !important; }
            .no-stack .col {
                min-width: 0 !important;
                display: table-cell !important; }
            .no-stack.two-up .col {
                width: 50% !important; }
            .no-stack.mixed-two-up .col.num4 {
                width: 33% !important; }
            .no-stack.mixed-two-up .col.num8 {
                width: 66% !important; }
            .no-stack.three-up .col.num4 {
                width: 33% !important; }
            .no-stack.four-up .col.num3 {
                width: 25% !important; }
            .mobile_hide {
                min-height: 0px;
                max-height: 0px;
                max-width: 0px;
                display: none;
                overflow: hidden;
                font-size: 0px; } 
                }

        </style>
        <style type="text/css" id="media-query-bodytag">

            body, p, h1, h2, h3, h4, h5, ol, li, ul, div{
            font-family: "Poppins", sans-serif !important;
            color: black;
            }
            .flex{
                display: flex;
            }

            .card {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;
            }

            .card > hr {
            margin-right: 0;
            margin-left: 0;
            }

            .center{
            text-align: center;
            }

            .card > .list-group:first-child .list-group-item:first-child {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
            }

            .card > .list-group:last-child .list-group-item:last-child {
            border-bottom-right-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
            }

            .card-body {
            -webkit-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            padding: 1.25rem;
            }

            .card-title {
            margin-bottom: 0.75rem;
            }

            .card-subtitle {
            margin-top: -0.375rem;
            margin-bottom: 0;
            }

            .card-text:last-child {
            margin-bottom: 0;
            }

            .card-link:hover {
            text-decoration: none;
            }

            .card-link + .card-link {
            margin-left: 1.25rem;
            }

            .card-header {
            padding: 0.75rem 1.25rem;
            margin-bottom: 0;
            background-color: rgba(0, 0, 0, 0.03);
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
            }

            .card-header:first-child {
            border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
            }

            .card-header + .list-group .list-group-item:first-child {
            border-top: 0;
            }

            .card-footer {
            padding: 0.75rem 1.25rem;
            background-color: rgba(0, 0, 0, 0.03);
            border-top: 1px solid rgba(0, 0, 0, 0.125);
            }

            .card-footer:last-child {
            border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
            }

            @media (max-width: 520px) {
            .block-grid {
                min-width: 320px!important;
                max-width: 100%!important;
                width: 100%!important;
                display: block!important;
            }

            .col {
                min-width: 320px!important;
                max-width: 100%!important;
                width: 100%!important;
                display: block!important;
            }

            .col > div {
                margin: 0 auto;
            }

            img.fullwidth {
                max-width: 100%!important;
            }
            img.fullwidthOnMobile {
                max-width: 100%!important;
            }
            .no-stack .col {
                min-width: 0!important;
                display: table-cell!important;
            }
            .no-stack.two-up .col {
                width: 50%!important;
            }
            .no-stack.mixed-two-up .col.num4 {
                width: 33%!important;
            }
            .no-stack.mixed-two-up .col.num8 {
                width: 66%!important;
            }
            .no-stack.three-up .col.num4 {
                width: 33%!important;
            }
            .no-stack.four-up .col.num3 {
                width: 25%!important;
            }
            .mobile_hide {
                min-height: 0px!important;
                max-height: 0px!important;
                max-width: 0px!important;
                display: none!important;
                overflow: hidden!important;
                font-size: 0px!important;
            }
            }
        </style>
    
    `;

  return stylesheet;
};

/*
    Parameters: header_color, logo, body, footer
*/
exports.mailer_template = (params) => {
  const template = `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
        <!--<![endif]-->

        ${this.mailer_stylesheet()}
        </head>
        <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF">

        <!--[if IE]><div class="ie-browser"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #FFFFFF;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #FFFFFF;"><![endif]-->

            <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid two-up ">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]><td align="center" width="310" style=" width:310px; padding-right: 10px; padding-left: 10px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="col num6" style="max-width: 320px;min-width: 310px;display: table-cell;vertical-align: top; text-align: center;">
                            <div style="background-color: '${
                              params.header_color
                            }'; width: 100% !important;">
                                <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 10px; padding-left: 10px;"><!--<![endif]-->

                                    <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  text-align: center; padding-left: 0px;">
                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                                        <div style="line-height:15px;font-size:1px">&#160;</div>  <img class="center  autowidth " align="center" border="0" src="${
                                          params.logo
                                        }" style="width: 7em;" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 186px" width="186">
                                        <div style="line-height:15px;font-size:1px">&#160;</div><!--[if mso]></td></tr></table><![endif]-->
                                    </div>

                                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center" style="background-color:transparent;">
                <div class="text-center" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]><td align="center" width="620" style=" width:620px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="col num12" style="min-width: 320px;max-width: 620px;display: table-cell;vertical-align: top;">
                            <div style="background-color: transparent; width: 100% !important;">
                                <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->

                                <div class="card text-center" style="background-color:transparent;">
                                    <div class="card-body text-center">
                                        
                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 30px;"><![endif]-->
                                        
                                        <br/>
                                        <br/>
                                        <div style="font-family:"Poppins", sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 30px; padding-bottom: 30px;">
                                            <div style="font-size:12px;line-height:18px;font-family:"Poppins", sans-serif, sans-serif;text-align:center;">
                                                ${params.body}
                                            </div>
                                        </div>
                                        <br/>
                                        <br/>
                                        <!--[if mso]></td></tr></table><![endif]-->

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <tbody>
                                                <tr style="vertical-align: top">
                                                    <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 20px;padding-bottom: 20px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                        <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px dotted #CCCCCC;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <span></span>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <tbody>
                                                <tr style="vertical-align: top">
                                                    <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 20px;padding-bottom: 20px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                        <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px dotted #CCCCCC;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <span></span>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <!--[if (mso)|(IE)]><td align="center" width="620" style=" width:620px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                        <div class="col num12" style="min-width: 320px;max-width: 620px;display: table-cell;vertical-align: top;">
                                            <div style="background-color: transparent; width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->


                                                <div class="">
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
                                                    <div style="font-family:"Poppins", sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">
                                                        <div style="font-size:12px;line-height:14px;font-family:"Poppins", sans-serif;text-align:left;">
                                                            ${params.footer}
                                                            <br />
                                                            <p>Copyright &copy; ${
                                                              params.date
                                                            } ${
    process.env.APP_NAME
  } All rights reserved. </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                </div>

                                                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                            </div>
                                        </div>
                                        <br/>
                                        <br/>
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->


                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </div>
            </div>

            
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (mso)|(IE)]></div><![endif]-->


        </body>
        </html>
    `;

  return template;
};
