import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <head>
        <title>Page Not Found</title>
      </head>
      <style>
        {`
          body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fafafa;
          }
          .container {
            text-align: center;
            padding: 2rem;
          }
          .error-code {
            font-size: 4rem;
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 1rem;
          }
          .title {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 0.5rem;
          }
          .description {
            color: #666;
            margin-bottom: 2rem;
          }
          .link {
            color: #e74c3c;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border: 1px solid #e74c3c;
            border-radius: 4px;
            transition: all 0.2s ease;
          }
          .link:hover {
            background-color: #e74c3c;
            color: white;
          }
        `}
      </style>
      <body>
        <div className='container'>
          <div className='error-code'>404</div>
          <h2 className='title'>Not Found</h2>
          <p className='description'>Could not find requested resource</p>
          <Link href='/' className='link'>Return Home</Link>
        </div>
      </body>
    </html>
  );
}
