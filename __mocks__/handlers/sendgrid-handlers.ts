import { rest } from 'msw';

/**
 * SendGrid API: https://docs.sendgrid.com/api-reference
 */

const handlers = [
  rest.post('https://api.sendgrid.com/v3/mail/send', async (req, res, ctx) => {
    const sendMailResponse = [
      {
        statusCode: 202,
        body: '',
        headers: {
          server: 'nginx',
          date: 'Sun, 1 Jan 2020 00:00:00 GMT',
          'content-length': '0',
          connection: 'close',
          'x-message-id': 'ABC-DEF-FGH',
          'access-control-allow-origin': 'https://sendgrid.api-docs.io',
          'access-control-allow-methods': 'POST',
          'access-control-allow-headers':
            'Authorization, Content-Type, On-behalf-of, x-sg-elas-acl',
          'access-control-max-age': '600',
          'x-no-cors-reason':
            'https://sendgrid.com/docs/Classroom/Basics/API/cors.html',
          'strict-transport-security': 'max-age=600; includeSubDomains',
        },
      },
      '',
    ];
    return res(ctx.status(200), ctx.json(sendMailResponse));
  }),
];

export default handlers;
