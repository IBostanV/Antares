UI for the Play-Quiz Application

#Commands
<ol>
    <li>npm run build  --> used to make a nexus build</li>
    <li>npm run dev    --> used to start the application in development mode</li>
    <li>eslint --fix . --> fixes most of the eslint issues</li>
    <li>yarn add &lt package &gt  --> used to add a new dependency</li>
</ol>

#Enhancements
<ul>PQ-19 [FE] Improve Application func to use common Layout
    <li><i>Component</i> in <b>_app.jsx</b> basically represents the current page component</li>
    <li>props from <i>getServerSideProps()</i> in <b>index.jsx</b> are used as <i>pageProps</i> in <b>_app.jsx</b></li>
</ul>


#For Next.js redirects use the following snippet in next.config.js:

```
async redirects() {
return [
{
    source: '/',
    destination: '/home',
    permanent: true,
    },
    ]
}
```
