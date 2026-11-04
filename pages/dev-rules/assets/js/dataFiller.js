(function (global) {
    'use strict';

    const devRulesContent = {
        title: 'Developers Notes',
        sections: [
            {
                id: 'legacy-refactor-principles',
                title: 'Legacy Refactor Principles',
                description: 'We must follow these principles and practices in areas we code. Since this is a legacy system, refactor only in touched areas.'
            },
            {
                id: 'five-layer-architecture',
                title: '5-Layer Architecture',
                bullets: [
                    'Controller: Entry point, request handling, orchestration (must delegate, no business logic, can call multiple services)',
                    'Service: Business logic, use-case logic (decision engine, fully owns behavior)',
                    'Repository: Data access abstraction (all SQL, parameter-driven, no business rules)',
                    'Model: Data structure and validations (data contract only)',
                    'View: Presentation layer (UI only, no logic or SQL)'
                ]
            },
            {
                id: 'rules',
                title: 'Rules',
                bullets: [
                    'Touched logic must exit the old pattern completely',
                    'No dual paths for the same behavior (no fallback to old logic)',
                    'One Service entry point per behavior',
                    'No logic in View',
                    'Controller must not contain decision logic or SQL',
                    'Controller can call multiple services but must not contain logic between them',
                    'Repository must not contain business decisions',
                    'Service must fully own the behavior it handles'
                ]
            },
            {
                id: 'practice',
                title: 'Practice',
                bullets: [
                    'SOC (Separation of Concerns)',
                    'SRP (Single Responsibility per class/function)',
                    'No magic values (use named constants)',
                    'MVC + 2 extensions (Service, Repository)',
                    'KISS (avoid unnecessary abstraction)',
                    'YAGNI (build only what is needed for current scope)',
                    'OOP (clear responsibility and structure)',
                    'Maintainable and sustainable (readable, traceable, minimal dependency on old logic)'
                ]
            },
            {
                id: 'execution-practices',
                title: 'Execution Practices',
                bullets: [
                    'Replace entire decision blocks, not partial conditions',
                    'Do not mix old and new logic within the same behavior',
                    'Ensure a single clear flow (Controller -> Service -> Repository)',
                    'Keep changes localized to the touched scope, but fully consistent within that scope',
                    'Prefer explicit parameters over hidden defaults',
                    'Avoid deep chaining of services (keep flow shallow and traceable)',
                    'Ensure each Service represents a clear use-case, not micro-logic',
                    'Remove unreachable or replaced code only when new logic fully covers behavior',
                    'Do not reuse legacy helpers inside new Service logic',
                    'Keep Repository methods explicit and predictable (no hidden filters or assumptions)',
                    'Validate inputs at Model level before entering Service logic',
                    'Keep return values consistent and predictable (avoid mixed types or structures)',
                    'Avoid comments; only allow when behavior is not obvious (focus on why)'
                ]
            },
            {
                id: 'service-practices',
                title: 'Service Practices',
                bullets: [
                    'One Service = one clear use-case (not a generic utility)',
                    'Service methods must be understandable in one read (no hidden branching across files)',
                    'Avoid chaining more than 2-3 services in a single flow',
                    'Service must not call legacy helpers or mixed-layer logic',
                    'Service inputs must be explicit (no hidden globals or side effects)',
                    'Service outputs must be predictable (consistent structure)'
                ]
            },
            {
                id: 'controller-practices',
                title: 'Controller Practices',
                bullets: [
                    'Controller only sequences service calls; no decision-making between them',
                    'No conditional branching in Controller that affects business outcome',
                    'Each Controller action must map to a clear use-case',
                    'Avoid reusing Controller logic across actions (keep orchestration local)'
                ]
            },
            {
                id: 'repository-practices',
                title: 'Repository Practices',
                bullets: [
                    'Methods must reflect query intent clearly (no generic getters)',
                    'No default filters unless explicitly passed',
                    'Do not combine unrelated queries in a single method',
                    'Keep query shape consistent (same input -> same structure output)'
                ]
            },
            {
                id: 'code-reduction-practices',
                title: 'Code Reduction Practices',
                bullets: [
                    'Remove code only if new logic fully covers its behavior',
                    'Do not remove code with unclear purpose without validation',
                    'Prefer replacing duplicated logic with a single Service',
                    'Keep removed logic briefly documented if behavior is not obvious'
                ]
            },
            {
                id: 'naming-convention',
                title: 'Naming Convention',
                bullets: [
                    'No generic names (Assessment, User, Account, Data, Time, Info, Instructions, Battery)',
                    'No one-word names',
                    'Explicit and intention-revealing',
                    'No abbreviations',
                    'Naming depends on level (class = use-case, method = action, variable = context)',
                    'Apply to variables, methods, and classes',
                    'Variables and methods: camelCase',
                    'Classes: PascalCase',
                    'Constant: SNAKE_UPPER_CASE'
                ]
            },
            {
                id: 'validation',
                title: 'Validation',
                bullets: [
                    'Must pass phpstan before staging'
                ]
            },
            {
                id: 'testing',
                title: 'Testing',
                bullets: [
                    'Create unit testing and integration testing for new or modified logic'
                ]
            },
            {
                id: 'test-structure',
                title: 'Test Structure',
                bullets: [
                    'unit/models',
                    'unit/services',
                    'unit/repositories',
                    'unit/controllers',
                    'integration',
                    'coverage/e2e',
                    'coverage/unit/models',
                    'coverage/unit/services',
                    'coverage/unit/repositories',
                    'coverage/unit/controllers'
                ]
            },
            {
                id: 'manual-testing',
                title: 'Manual Testing',
                bullets: [
                    'Identify the behavior being replaced',
                    'List all possible input scenarios (valid, invalid, edge cases)',
                    'Execute each scenario in dev environment',
                    'Verify expected output and behavior',
                    'Confirm no fallback to old logic occurs',
                    'Re-test after cleanup',
                    'Validate again in staging before UAT'
                ]
            }
        ]
    };

    global.__devRulesContent = devRulesContent;
})(window);
