{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };
        in
        with pkgs;
        {
          devShells.default = mkShell {

            buildInputs = [
                nodejs
                nodePackages.npm
                nodePackages.prisma
            ];
            #shellHook = ''PATH="$PWD/node_modules/.bin:$PATH"'';

            ##PRISMA_MIGRATION_ENGINE_BINARY = "${prisma-engines}/bin/migration-engine";
            #PRISMA_QUERY_ENGINE_BINARY = "${prisma-engines}/bin/query-engine";
            #PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
            ##PRISMA_INTROSPECTION_ENGINE_BINARY = "${prisma-engines}/bin/introspection-engine";
            #PRISMA_FMT_BINARY = "${prisma-engines}/bin/prisma-fmt";
            PRISMA_SCHEMA_ENGINE_BINARY = "${prisma-engines}/bin/schema-engine";
            PRISMA_QUERY_ENGINE_BINARY = "${prisma-engines}/bin/query-engine";
            PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
            PRISMA_FMT_BINARY = "${prisma-engines}/bin/prisma-fmt";

          };
        }
      );
}

