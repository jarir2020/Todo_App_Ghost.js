# Ghost.js Bugs - Android/Capacitor Compatibility Issues

## Date Reported: 2026-10-16

## Issue #1: Function-based Reactive Children Not Handled in Bundled Code

**Severity**: Critical  
**Environment**: Android WebView (Capacitor), Bundled/Production Build  

### Description
When using function-based reactive children `children: () => [...]` in components, the bundled Ghost.js code throws a runtime error:

```
TypeError: t.children.forEach is not a function
```

### Root Cause
The internal rendering logic in Ghost.js attempts to call `.forEach()` on the `children` property, but when children are defined as a function (for reactivity), the code doesn't properly unwrap/evaluate the function before iterating.

### Reproduction Steps
1. Create a component with reactive function children:
```javascript
const TodoFooter = () => ({
    tag: 'footer',
    props: { class: 'todo-footer' },
    children: () => {
        const todos = signal.get();
        return todos.map(todo => TodoItem(todo));
    }
});
```

2. Build the app with `ghost build`
3. Deploy to Android via Capacitor
4. The app shows blank screen with console error

### Expected Behavior
Ghost.js should automatically evaluate function children before attempting to iterate over them, similar to how it handles function-based props.

### Current Workaround
Use static children arrays and manually re-render the entire app on state changes:

```javascript
// Instead of:
children: () => todos.get().map(todo => TodoItem(todo))

// Use:
children: todos.get().map(todo => TodoItem(todo))

// And manually trigger re-render:
function renderApp() {
    document.body.innerHTML = '';
    mount(App(), document.body);
}
```

### Files Affected
- The core rendering engine (likely in `@ghost-js/core`)
- Specifically the `h()` or render function that processes component trees

### Suggested Fix
In the component rendering logic, add a check to evaluate function children:

```javascript
function processChildren(children) {
    // If children is a function, evaluate it first
    const resolvedChildren = typeof children === 'function' ? children() : children;
    
    // Now safely iterate
    if (Array.isArray(resolvedChildren)) {
        resolvedChildren.forEach(child => renderChild(child));
    }
}
```

---

## Issue #2: Function-based Props May Have Similar Issues

**Severity**: Medium  
**Environment**: Android WebView (Capacitor), Bundled/Production Build  

### Description
While function-based reactive props like `class: () => 'active'` may work in some cases, they exhibited inconsistent behavior in the Android environment.

### Affected Code Pattern
```javascript
const TodoItem = (todo) => ({
    tag: 'li',
    props: {
        class: () => `todo-item ${todo.completed ? 'completed' : ''}`
    },
    // ...
});
```

### Workaround Applied
Changed to static prop evaluation:

```javascript
const TodoItem = (todo) => ({
    tag: 'li',
    props: {
        class: `todo-item ${todo.completed ? 'completed' : ''}`
    },
    // ...
});
```

### Recommendation
Ensure all function-based props are properly evaluated during the render cycle, especially in bundled/production builds.

---

## Issue #3: ES Module Imports Not Reliable in Android WebView

**Severity**: High  
**Environment**: Android WebView (Capacitor)  

### Description
Using `<script type="module">` with dynamic imports doesn't work reliably in Android WebView:

```html
<script type="module">
    const candidates = ['/dist/dev/bundle.js', '/dist/build/bundle.js'];
    for (const source of candidates) {
        try {
            await import(source);
            break;
        } catch {
            // Fails silently in Android WebView
        }
    }
</script>
```

### Solution
Use standard script tag instead:

```html
<script src="bundle.js"></script>
```

### Recommendation
- Document this limitation in Ghost.js Android/Capacitor deployment guide
- Consider providing a build flag that generates non-module compatible bundles
- Or auto-detect Capacitor builds and adjust the HTML template accordingly

---

## Testing Environment
- **Platform**: Android (tested in emulator)
- **WebView Version**: Chrome 124.0.6367.219
- **Capacitor Version**: Latest (as of 2026-10-16)
- **Ghost.js Version**: 1.0.0
- **Build Command**: `ghost build`

---

## Additional Notes

### What Worked
- Signal-based state management
- Event handlers (onclick, oninput, etc.)
- Static children arrays
- Static props
- Manual re-rendering approach

### What Didn't Work
- Function-based reactive children
- Function-based reactive props (inconsistent)
- ES module imports in WebView
- Absolute paths in resources (`/src/styles.css` vs `src/styles.css`)

---

## Recommended Actions for Next Release

1. **Fix function children handling** - Critical for reactive patterns
2. **Add Android/Capacitor tests** to CI/CD pipeline
3. **Document WebView limitations** in deployment guides
4. **Provide template/example** for mobile app deployment
5. **Consider adding** a `--target mobile` build flag that:
   - Generates non-module scripts
   - Uses relative paths
   - Optimizes for WebView compatibility

---

## Contact
Reported during experimental Todo List app development
Date: October 16, 2026
