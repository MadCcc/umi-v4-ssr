## SSR issue

### How to reproduce

1. Install and run this project

```bash
pnpm i
pnpm run dev
```

2. Visit `docs/` page: http://localhost:8000/docs , you will see:

![image](https://user-images.githubusercontent.com/27722486/231645974-dbbca469-09e3-4649-90f0-de414b8a3d20.png)

In this page, `Layout hydrating` will change to `Layout hydrated` before `docs/ hyrdating` change. It is because page is wrapped by `Suspense` in umi-ssr, and with `renderToPipeableStream`, hydration will be seperated for layout and page.

3. Refresh the page, and click `Hash Change` link when the page is hydrating.
If hash changed before page is hydrated, you will see this warning in console:

![image](https://user-images.githubusercontent.com/27722486/231647420-836a8bce-e842-4582-87a3-1b90f0cac44b.png)

The reason is that `useLocation` is used in this page, which is implemented with React context. When this page is hydrating, hash was changed and inspected by react-router in Layout (Where hydration was done). So unexpected state update happened.

### Possible ways to fix

1. Remove Suspense in umi, but remain `renderToPipeableStream` for Streaming SSR. 
This does not resolve the problem, but will make user easier to manage Suspense. 
2. Override react-router `useLocation` in umi, to wrap context update in `startTransiton`.

### Related issues

Not only hash change but also route change will cause this warning too, and the origin interaction of user would be click on `Link` Component of react-router.
So with Streaming SSR, any updates of context in Layout should not be passed to children when children are hydrating.
