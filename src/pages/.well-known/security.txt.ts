export function GET() {
  return new Response(
    [
      'Contact: https://www.linkedin.com/in/marcopicanco/',
      'Expires: 2027-07-23T00:00:00.000Z',
      'Canonical: https://www.marcopicanco.com/.well-known/security.txt',
      'Preferred-Languages: pt-BR, en',
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  )
}
