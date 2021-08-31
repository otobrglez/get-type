with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "get-type";
    buildInputs = [
        nodejs-16_x
    ];
    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
